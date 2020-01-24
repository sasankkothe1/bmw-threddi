import React, {Component} from 'react';
import {withRouter} from "react-router";
import ConfigurationModal from '../../src/components/configurationComponents/configurationModal';

class SideBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            addModalShow: true,
        };

        this.getActiveRouteElement = this.getActiveRouteElement.bind(this);
        this.addModalClose = this.addModalClose.bind(this);
    }

    addModalClose(){
        this.setState({addModalShow: false});
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
                    <div className={"configurationIconClass"} onClick={() => this.setState({addModalShow: true})}>
                        <i className="fas fa-cog fa-2x"/>
                    </div>
                    <ConfigurationModal
                    show={this.state.addModalShow}
                    onHide={this.addModalClose}/>
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