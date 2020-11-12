import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import WelcomeScreen from './components/WelcomeScreen'
import CaptureScreen from './components/CaptureScreen'
import SoftBioForm from './components/SoftBioForm';

function App() {
  return (
    <Router>
      <div className="container">
      <br/>
      <Route path="/" exact component={WelcomeScreen} />
      <Route path="/start" component={SoftBioForm}/>
      <Route path="/capture"  component={CaptureScreen}/>
      </div>
    </Router>
  );
}

export default App;
