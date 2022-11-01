import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { Redirect, Route } from "react-router";
import GoodMemories from "../pages/GoodMemories";
import BadMemories from "../pages/BadMemories";

import { happyOutline, sadOutline } from 'ionicons/icons';

import NewMemory from "../pages/NewMemory";

const Tabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/memories/good" />
                <Route exact path="/tabs/memories/good" component={GoodMemories} />
                <Route exact path="/tabs/memories/bad" component={BadMemories} />
                <Route exact path="/tabs/create/memories" component={NewMemory} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="good" href="/tabs/memories/good">
                    <IonIcon icon={happyOutline} />
                    <IonLabel>Good Memories</IonLabel>
                </IonTabButton>
                <IonTabButton tab="bad" href="/tabs/memories/bad">
                    <IonIcon icon={sadOutline} />
                    <IonLabel>Bad Memories</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
};

export default Tabs;