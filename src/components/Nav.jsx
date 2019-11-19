import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoGlobe } from "react-icons/go";
import { GoThreeBars } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import {Navbar} from 'react-bootstrap';

export default class Nav extends Component {
    render () {
        return (
        <div>
            <Navbar className="NavBarMainHeader" bg="light" expand="lg">
                <Navbar.Brand className="NavBrandClass">
                    <Link className="BrandLink" to="/">Global Threat Analysis</Link>
                </Navbar.Brand>
            </Navbar>
        </div>
        
        )
    }
}