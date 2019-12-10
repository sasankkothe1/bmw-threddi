import React, {Component} from 'react';
import './EventSidebar.css';
import MetricBatchComponent from "../metricBatchComponent/MetricBatchComponent";
import BatchComponent from "../actorBatchComponent/BatchComponent";
import Button from "react-bootstrap/Button";
import moment from "moment";

import UIActions from "../../actions/ui.actions";
import ShortEventList from "../shortEventListComponent/ShortEventList";

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
                    <div className={"event-sidebar"}>
                        <div className={"ev-header"}>
                            <div className={"ev-event-name"}>
                                {this.props.activeEvent.id}
                            </div>
                            <div className={"ev-source"}>{this.props.activeEvent.origin}</div>
                        </div>

                        <div className={"ev-description"}>
                            <div className={"ev-description-header"}>Description</div>
                            <div className={"ev-description-text"}>
                                {this.props.activeEvent.description}
                                <a className={"ev-description-source-link"} href={this.props.activeEvent.url}>View
                                    Source</a>
                            </div>
                        </div>
                        <div>
                            <div className={"ev-batches"}>
                                <MetricBatchComponent size="big" value={this.props.activeEvent.importance}
                                                      field="Importance"/>
                                <MetricBatchComponent size="big" value="TBC" field="Distance To Location"/>
                            </div>
                            <div className={"ev-batches"}>
                                <MetricBatchComponent size="medium"
                                                      value={this.props.activeEvent.sentiment_group > 0 ? `+${this.props.activeEvent.sentiment_group}` : this.props.activeEvent.sentiment_group}
                                                      field="Sentiment"/>
                                <MetricBatchComponent size="medium"
                                                      value={moment(this.props.activeEvent.timestamp, "YYYYMMDDHHmmSS" ).format("DD/MM/YYYY")}
                                                      field="Day of Occurance"/>
                                <MetricBatchComponent size="medium" value={moment(this.props.activeEvent.timestamp, "YYYYMMDDHHmmSS" ).format("hh:mm")}
                                                      field="Time"/>
                            </div>
                        </div>
                        <div className={"ev-actors"}>
                            <div className={"ev-sub-header"}> Actors</div>
                            {this.props.activeEvent.actors.map((actor, index) =>
                                <BatchComponent element={actor} key={index}/>
                                )
                            }

                            {/*<BatchComponent element={{"name": "Republic of Kyrgyztan", "type": "Police"}}/>*/}
                        </div>


                        <div className={"ev-show-on-map"}>
                            <Button variant="outline-primary">Show on Map</Button>
                            <Button variant="outline-primary" onClick={() => {
                                UIActions.showAdditionalInformationModal()
                            }}>Additional Information</Button>
                        </div>

                    </div>) :

                    <ShortEventList/>

                }
            </div>
        )
    }
}