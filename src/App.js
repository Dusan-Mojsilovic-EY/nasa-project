import './App.css';

import Home from './Pages/Home/Home'
import Aplication from './Pages/Aplication/Aplication'
import PrivacyNotice from './Pages/PrivacyNotice/PrivacyNotice';
import Terms from './Pages/Terms/Terms';
import Wizard from './Pages/Wizard/Wizard';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import DataContextProvider from './Context/DataContext';

import {Route, Switch} from 'react-router-dom'

const App = () => (
    <div className="App">
      <Header />
      <DataContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aplication" component={Aplication} />
          <Route path="/wizard" component={Wizard} />
          <Route path="/privacy" component={PrivacyNotice} />
          <Route path="/terms" component={Terms} />
       </Switch>
       </DataContextProvider>
      <Footer />
    </div>
)

export default App;
