import React , {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Incident from './components/Incident';
import Nav from './components/Nav';
import SideBar from './components/SideBar';
import './components/Nav.css';
import './components/SideBar.css';

class App extends Component {

/* we use handler in the name as we are not calling it particularly but we
   are using it to handle something. */
  
  render() {
    return (
      <Router>
        <div>
          <Nav/>
          <SideBar/>
          <Route exact path="/" component={Home} />
          <Route exact path="/incidents" component={Incident} />
        </div>
      </Router>
    );

    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m react app!!!'));

  }
}

export default App;
