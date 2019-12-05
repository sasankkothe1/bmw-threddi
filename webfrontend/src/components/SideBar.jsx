import React, {Component} from 'react';
import {withRouter} from "react-router";

class SideBar extends Component {

    constructor(props){
        super(props);

        this.getActiveRouteElement = this.getActiveRouteElement.bind(this)
    }

    render() {
        return (
            <div className="sidebarClass">
                <aside className="aside">
                    <div className={"nav-item " + this.getActiveRouteElement('/')} onClick={()=>this.forwardTo('/')}>
                        <i className="fas fa-globe-americas item-nav fa-2x"/>
                    </div>
                    <div className={"nav-item " + this.getActiveRouteElement('/incidents')} onClick={()=>this.forwardTo('/incidents')}>
                        <i className="fas fa-bars fa-2x"/>
                    </div>
                    <div className={"nav-item " + this.getActiveRouteElement('/locations')} onClick={()=>this.forwardTo('/locations')}>
                        <i className="fas fa-map-marker-alt fa-2x"/>
                    </div>
                </aside>
            </div>
        )
    }

    getActiveRouteElement(path){
        return path===this.props.location.pathname?"active-route":""
    }

    forwardTo(route){
        this.props.history.push(route)
    }
}

export default withRouter(SideBar)