import React, {Component} from 'react';
import './EventSidebar.css';
import MetricBatchComponent from "../metricBatchComponent/MetricBatchComponent";
import BatchComponent from "../actorBatchComponent/BatchComponent";
import Button from "react-bootstrap/Button";
import moment from "moment";

import UIActions from "../../actions/ui.actions";
import ShortEventList from "../shortEventListComponent/ShortEventList";
import DetailedEventView from "../detailedEventView/DetailedEventView";

export default class EventSidebar extends Component {

    render() {
        return (
            <div className={"event-sidebar-wrapper"}>
                {this.props.activeEvent ? (
                    <Button variant="link" onClick={() => this.props.onRemoveActiveEvent()}>
                        <i className="fas fa-times close-icon"/>
                    </Button>
                ) : ""}
                {this.props.activeEvent ? (
                    <DetailedEventView activeEvent={this.props.activeEvent}/>) :
                    (this.props.mode==="list"?
                        <ShortEventList />
                        :"")
                }
            </div>
        )
    }
}