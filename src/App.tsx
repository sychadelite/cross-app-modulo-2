import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Components */
import Tabs from './components/Tabs';
import { Route, Redirect } from 'react-router';
import MemoriesContextProvider from './data/MemoriesContextProvider'
import { useContext, useEffect } from 'react';
import MemoriesContext from './data/memories-context';

/* Pages */


setupIonicReact();

const App: React.FC = () => {

  const memoriesCtx = useContext(MemoriesContext);
  const {initContext} = memoriesCtx;
  useEffect(() => {
    initContext();
  }, [initContext]);

  return (
    <IonApp>
      <IonReactRouter>
        {/* <MemoriesContextProvider> */}
          <IonRouterOutlet id="main">
            <Route path="/tabs" component={Tabs} />
            <Redirect exact from='/' to='/tabs' />
          </IonRouterOutlet>
        {/* </MemoriesContextProvider> */}
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
