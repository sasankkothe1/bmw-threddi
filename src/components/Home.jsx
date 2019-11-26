import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoGlobe } from "react-icons/go";
import { GoThreeBars } from "react-icons/go";
import { GoLocation } from "react-icons/go";
import {Navbar, NavbarBrand} from 'react-bootstrap';

export default class Home extends Component {
    render () {
        return (
            <div className="main" >
                <h1>This is home</h1>
            </div>
        )
    }
}