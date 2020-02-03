import React, {Component} from 'react';
import {withRouter} from "react-router";
import ConfigurationModal from '../../src/components/configurationComponents/configurationModal';
import Toast from "react-bootstrap/Toast";
import ConfigurationStore from "../stores/config.store";

class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            showTriggerModal: false
        };

        this.getActiveRouteElement = this.getActiveRouteElement.bind(this);
        this.addModalClose = this.addModalClose.bind(this);
        this.showTriggerModal = this.showTriggerModal.bind(this);
    }

    componentDidMount(){
        ConfigurationStore.addChangeListener("TRIGGER_EXTRACTOR", this.showTriggerModal)
    }

    showTriggerModal(){
        console.log("Show trigger modal");
        this.setState({showTriggerModal:true})
    }

    componentWillMount(){
        ConfigurationStore.removeChangeListener("TRIGGER_EXTRACTOR", this.showTriggerModal)
    }
    addModalClose() {
        this.setState({addModalShow: false});

    }

    render() {
        return (
            <div className="sidebarClass">
                <aside className="aside">
                    <div className={"nav-item " + this.getActiveRouteElement('/')} onClick={() => this.forwardTo('/')}>
                        <i className="fas fa-globe-americas item-nav fa-2x"/>
                    </div>
                    <div className={"nav-item " + this.getActiveRouteElement('/incidents')}
                         onClick={() => this.forwardTo('/incidents')}>
                        <i className="fas fa-bars fa-2x"/>
                    </div>
                    <div className={"nav-item " + this.getActiveRouteElement('/locations')}
                         onClick={() => this.forwardTo('/locations')}>
                        <i className="fas fa-map-marker-alt fa-2x"/>
                    </div>
                    <div className="nav-item" onClick={() => this.setState({addModalShow: true})}>
                        <i className="fas fa-cog fa-2x"/>
                    </div>
                    <ConfigurationModal
                        show={this.state.addModalShow}
                        onHide={this.addModalClose}/>
                </aside>
                <Toast onClose={()=>this.setState({showTriggerModal:false})} show={this.state.showTriggerModal} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Extractor Triggered</strong>
                    </Toast.Header>
                    <Toast.Body>The extracting with the changed configuration was triggered successfully. Changes can be seen in a few moments</Toast.Body>
                </Toast>
            </div>
        )
    }

    getActiveRouteElement(path) {
        return path === this.props.location.pathname ? "active-route" : ""
    }

    forwardTo(route) {
        this.props.history.push(route)
    }
}

export default withRouter(SideBar)