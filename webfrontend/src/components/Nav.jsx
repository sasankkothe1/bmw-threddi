import React, { Component } from 'react';

import {Navbar, Button} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import { Redirect } from 'react-router';


export default class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logout: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Remove the user object from the Redux store

    this.setState({logout:true})
  }



    render () {

      if (this.state.logout) {
        return <Redirect push to="/login" /> ;
      }
        return (

            <Navbar className="NavBarMainHeader nav" bg="light" expand="lg">
                <Navbar.Brand className="NavBrandClass" href={"#home"}>
                    <div className={"header-brand"}>
                        <div className={"main-brand"}>Threddi</div>
                        <div className={"brand-caption"}>Powered by TUM and BMW</div>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="danger" onClick={this.handleClick}> Log Out </Button>
                </Navbar.Collapse>
                {/*<Image src="https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg" roundedCircle />*/}
            </Navbar>
        )
    }
}
