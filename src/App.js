import './App.css';

import Home from './Pages/Home/Home'
import PrivacyNotice from './Pages/PrivacyNotice/PrivacyNotice';
import Terms from './Pages/Terms/Terms';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import {Route, Switch} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/privacy" component={PrivacyNotice} />
          <Route path="/terms" component={Terms} />
       </Switch>
      <Footer />
    </div>
  );
}

export default App;
