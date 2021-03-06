import React, {Component} from 'react';
import './AdditionalInformationModalComponent.css';

import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";
import BatchComponent from "../actorBatchComponent/BatchComponent";

import UIStore from "../../stores/ui.store";
import UIActions from "../../actions/ui.actions";
import MetricBatchComponent from "../metricBatchComponent/MetricBatchComponent";
import moment from "../eventSidebarComponent/EventSidebar";


export default class AdditionalInformationModalComponent extends Component {

    constructor(props) {
        super(props);


        this.state = {
            show: UIStore.getShowAdditionalInformationModal()
        };

        this.setShow = this.setShow.bind(this);
    }

    componentDidMount() {
        UIStore.addChangeListener("SHOW_ADDITIONAL_INFORMATION_MODAL", this.setShow);
        UIStore.addChangeListener("CLOSE_ADDITIONAL_INFORMATION_MODAL", this.setShow);
    }

    setShow() {
        this.setState({
            show: UIStore.getShowAdditionalInformationModal()
        })
    }

    closeModal() {
        UIActions.closeAdditionalInformationModal();
    }

    render() {
        return (
                <Modal show={this.state.show} onHide={()=>this.closeModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Additional Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"additional-information-batches-container"}>
                        {this.props.activeEvent?this.props.activeEvent.source_dependent_information.map((information, i) => {
                            {
                                let element = {};
                                element[information.displayname] = information.value;
                                return (
                                    <MetricBatchComponent size="medium"
                                                          key={i}
                                                          value={Object.values(element)[0]}
                                                          field={Object.keys(element)[0]}/>
                                )
                            }
                        }):""}
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal>
        )
    }
}