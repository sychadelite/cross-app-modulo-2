import { IonPage, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonCard, IonCardContent, IonIcon, IonButton, useIonViewWillEnter, useIonViewWillLeave, IonFab, IonFabButton, IonGrid, IonCol, IonRow, IonCardHeader, IonCardTitle } from "@ionic/react";
import { add } from 'ionicons/icons';
import { getPlatforms } from '@ionic/react';
import { useContext, useEffect, useState } from "react";
import MemoriesContext from "../data/memories-context";

const GoodMemories: React.FC = () => {
    var [counter, setCounter] = useState(0);  
    var [device] = useState(getPlatforms());
    const [count, setCount] = useState(0);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const memoriesCtx = useContext(MemoriesContext);
    const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good')
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
    });
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
                    <IonTitle>Good Memories</IonTitle>
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
                    <IonCardContent className="ion-text-center ion-margin-bottom">
                        {count % 2 === 0 ? <h2>Hope you have more good memories +</h2> : <h2>Hope you have more good memories {count}</h2>}
                        <IonButton className="ion-margin-top" onClick={() => setCount(count + 1)}>
                            Ameen
                        </IonButton>
                    </IonCardContent>
                    <IonCardContent className="ion-text-center ion-margin-bottom">
                        <h2>Screen Width: {windowSize.innerWidth}</h2>
                        <h2>Screen Height: {windowSize.innerHeight}</h2>
                    </IonCardContent>
                </IonCard>

                <IonGrid>
                    {goodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No good memories found.</h2>
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

export default GoodMemories;