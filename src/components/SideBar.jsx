import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
    render () {
        return (
                <aside className="aside aside-1">
                    <Link className="faIcon" to="/"><i className="fas fa-globe-americas"></i></Link>
                    <Link className="faIcon" to="/incidents"><i className="fas fa-bars"></i></Link>
                    <Link className="faIcon" to="/locations"><i className="fas fa-map-marker-alt"></i></Link>
                </aside>
        )
    }
}