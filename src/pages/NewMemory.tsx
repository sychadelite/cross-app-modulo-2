import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonCard, IonCardContent, IonIcon, IonButton, IonBackButton, IonInput, IonItem, IonLabel, IonRow, IonCol } from "@ionic/react";
import { camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/* CSS */
import '../css/NewMemory.css'

const GoodMemories: React.FC = () => {

    const takePhotoHandler = async () => {
        const image = Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(image);
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
                    <IonInput placeholder="Memory Title ..."></IonInput>
                </IonItem>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div className="image-preview">
                            <h3>No photo chosen</h3>
                        </div>
                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera}/>
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton>Add Memory</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
};

export default GoodMemories;