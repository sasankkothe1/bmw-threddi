import React , {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import Incident from './components/Incident';
import Location from './components/Location';
import Nav from './components/Nav';
import SideBar from './components/SideBar';
import './components/Nav.css';
import './components/SideBar.css';
import './components/home.css';
import './components/main.css';


class App extends Component {

/* we use handler in the name as we are not calling it particularly but we
   are using it to handle something. */
  
  render() {
    return (
      <Router>
          <Nav/>
          <div className="mainArea">
            <SideBar/>
            <Main/>
          </div>
      </Router>
    );

    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m react app!!!'));

  }
}

export default App;
