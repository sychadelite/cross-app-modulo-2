import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonCard, IonCardContent, IonIcon, IonButton, IonBackButton, IonInput, IonItem, IonLabel, IonRow, IonCol, IonSelect, IonSelectOption, useIonAlert } from "@ionic/react";
import { camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { base64FromPath } from '@ionic/react-hooks/filesystem';

/* CSS */
import '../css/NewMemory.css'
import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";

import MemoriesContext from "../data/memories-context";

const NewMemory: React.FC = () => {

    const [presentPhotoAlert] = useIonAlert();
    const [presentMemoryAlert] = useIonAlert();

    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined; // will store original URL
        preview: string; // will store preview URL for web
    }>();

    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const titleRef = useRef<HTMLIonInputElement>(null);
    const memoriesCtx = useContext(MemoriesContext);
    const history = useHistory();

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        
        if(!photo || !photo.webPath) {
            presentPhotoAlert({
                header: 'Alert',
                subHeader: 'Important message',
                message: 'Somehow the photo is not detected!',
                buttons: ['OK']
            })
            return;
        }

        setTakenPhoto({
            path: photo.path as any,
            preview: photo.webPath as any
        })
    }
    
    const selectMemoryTypeHandler = async (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    }

    const addMemoryHandler = async () => {
        const enteredTitle = titleRef.current?.value;
        if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType) {
            presentMemoryAlert({
                header: 'Alert',
                subHeader: 'Important message',
                message: 'Please fill all the required field!',
                buttons: ['OK']
            })
            return;
        }

        const fileName = new Date().getTime() + '.jpeg';
        const base64 = await base64FromPath(takenPhoto!.preview);
        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Data
        });

        memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType);
        history.length > 0 ? history.goBack() : history.replace('/tabs/memories/good')
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Add New Memory</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding ion-text-center" scrollY={true}>
                <IonCard className="ion-margin-bottom">
                    <IonCardContent className="ion-text-center">
                        <h2>Create a New Memory !</h2>
                    </IonCardContent>
                </IonCard>
                <IonItem className="box ion-margin">
                    <IonLabel position="floating" color="primary">Title</IonLabel>
                    <IonInput type="text" placeholder="Memory Title ..." ref={titleRef}></IonInput>
                </IonItem>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div className="image-preview">
                            {!takenPhoto && <h3>No photo chosen</h3>}
                            {takenPhoto && <img src={takenPhoto.preview} alt="preview" />}
                        </div>
                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera}/>
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center" style={{display: 'flex', justifyContent: 'center'}}>
                        <IonSelect style={{width: 150}} onIonChange={selectMemoryTypeHandler} value={chosenMemoryType}>
                            <IonSelectOption value="good">Good Memory</IonSelectOption>
                            <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                        </IonSelect>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
};

export default NewMemory;