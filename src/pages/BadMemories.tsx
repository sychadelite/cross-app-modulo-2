import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonCard, IonCardContent, IonIcon, IonButton, getPlatforms, useIonViewWillEnter, useIonViewWillLeave, IonFab, IonFabButton, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/react";
import { add } from 'ionicons/icons';
import { useState, useEffect, useContext } from "react";
import MemoriesContext from "../data/memories-context";

const BadMemories: React.FC = () => {
    var [counter, setCounter] = useState(0); 
    var [device] = useState(getPlatforms());
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const memoriesCtx = useContext(MemoriesContext);
    const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'bad')

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    useIonViewWillEnter(() => {
        setCounter(counter++);
        if(counter === 1) {
        }
    });
    useIonViewWillLeave(() => {
        setCounter(counter--);
        if(counter === 0) {            
        }
    });


    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bad Memories</IonTitle>
                    {device[0] === 'iphone' ?
                    <IonButtons slot="end" class="ion-margin-end">
                        <IonButton routerLink={'/tabs/create/memories'}>
                            <IonIcon slot="icon-only" icon={add} />
                        </IonButton>
                    </IonButtons>
                    : null}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" scrollY={true}>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <h2>Hope you won't have bad memories</h2>
                    </IonCardContent>
                </IonCard>

                <IonGrid>
                    {goodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No bad memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {goodMemories.map(memory => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard>
                                    <img src={memory.base64Url} alt={memory.title} />
                                    <IonCardHeader>
                                        <IonCardTitle>{memory.title}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>

                {device[0] !== 'iphone' ?
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink={'/tabs/create/memories'}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                : null}
            </IonContent>
        </IonPage>
    )
};

export default BadMemories;