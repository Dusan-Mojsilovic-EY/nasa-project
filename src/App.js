/* eslint-disable react/react-in-jsx-scope */
import "./App.css";

import Home from "./Pages/Home/Home";
import Application from "./Pages/Application/Application";
import PrivacyNotice from "./Pages/PrivacyNotice/PrivacyNotice";
import Terms from "./Pages/Terms/Terms";
import Wizard from "./Pages/Wizard/Wizard";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import DataState from "./Context/DataState";

import {Route, Switch} from "react-router-dom";

const App = () => (
    <div className="App">
      <Header />
      <DataState>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/aplication" component={Application} />
          <Route path="/wizard" component={Wizard} />
          <Route path="/privacy" component={PrivacyNotice} />
          <Route path="/terms" component={Terms} />
       </Switch>
       </DataState>
      <Footer />
    </div>
);

export default App;
