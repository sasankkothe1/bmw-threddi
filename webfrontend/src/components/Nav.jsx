import React, { Component } from 'react';

import {Navbar} from 'react-bootstrap';
import Image from "react-bootstrap/Image";

export default class Nav extends Component {
    render () {
        return (
            <Navbar className="NavBarMainHeader nav" bg="light" expand="lg">
                <Navbar.Brand className="NavBrandClass" href={"#home"}>
                    <div className={"header-brand"}>
                        <div className={"main-brand"}>Threddi</div>
                        <div className={"brand-caption"}>Powered by TUM and BMW</div>
                    </div>
                </Navbar.Brand>
                {/*<Image src="https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg" roundedCircle />*/}
            </Navbar>
        )
    }
}