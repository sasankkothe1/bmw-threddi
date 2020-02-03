import React , {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';
import Nav from './components/Nav';
import SideBar from './components/SideBar';
import './components/Nav.css';
import './components/SideBar.css';
import './views/home/home.css';
import './components/main.css';
import './components/IncidentEventDetails.css'
import './components/IncidentEventTable.css'
import './components/incident.css';
import './components/locationTableComponent/LocationRow.css';
import './views/location/location.css';
import './components/search.css';
import './components/configurationComponents/editConfigurationform.css';

import './views/login/LoginPage.css';
import './views/registration/registration-page.css';

class App extends Component {

  constructor(props){
      super(props);
      this.state={
          title:"BWM Threat Analysis"
      }
  }
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

  }

    componentDidMount(){
        document.title = this.state.title;
    }

}


export default App;
