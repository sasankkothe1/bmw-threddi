import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {Navbar} from 'react-bootstrap';

export default class Nav extends Component {
    render () {
        return (
            /*<Navbar className="NavBarMainHeader" bg="light" expand="lg">
                <Navbar.Brand className="NavBrandClass">
                    <Link className="BrandLink" to="/">Global Threat Analysis</Link>
                </Navbar.Brand>
            </Navbar>*/
            <header className="site-header"><Link className="BrandLink" to="/">Global Threat Analysis</Link></header>
        
        )
    }
}