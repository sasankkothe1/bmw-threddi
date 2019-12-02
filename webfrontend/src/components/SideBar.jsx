import React, {Component} from 'react';
import {withRouter} from "react-router";

class SideBar extends Component {
    render() {
        return (
            <div className="sidebarClass">
                <aside className="aside">
                    <div className={"nav-item active-route"} onClick={()=>this.forwardTo('/')}>
                        <i className="fas fa-globe-americas item-nav fa-2x"/>
                    </div>
                    <div className={"nav-item"} onClick={()=>this.forwardTo('/incidents')}>
                        <i className="fas fa-bars fa-2x"/>
                    </div>
                    <div className={"nav-item"} onClick={()=>this.forwardTo('/locations')}>
                        <i className="fas fa-map-marker-alt fa-2x"/>
                    </div>
                </aside>
            </div>
        )
    }

    forwardTo(route){
        this.props.history.push(route)
    }
}

export default withRouter(SideBar)