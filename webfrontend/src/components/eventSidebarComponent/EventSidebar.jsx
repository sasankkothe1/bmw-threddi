import React, {Component} from 'react';
import './EventSidebar.css';
import MetricBatchComponent from "../metricBatchComponent/MetricBatchComponent";
import ActorBatchComponent from "../actorBatchComponent/ActorBatchComponent";
import Button from "react-bootstrap/Button";

export default class EventSidebar extends Component {
    render() {
        return (
            <div className={"event-sidebar-wrapper"}>
                <i className="fas fa-times close-icon"/>
                <div className={"event-sidebar"}>
                    <div className={"ev-header"}>
                        <div className={"ev-event-name"}>
                            Very Long Event Name
                        </div>
                        <div className={"ev-source"}>GDELT</div>
                    </div>

                    <div className={"ev-description"}>
                        <div className={"ev-description-header"}>Description</div>
                        <div className={"ev-description-text"}>The cheese melts on the burger and in your mouth,
                            perfectly complementing the medium-rare beef.
                            Any burger lover worth their salt knows the best patty is comprised of ground chuck and
                            brisket.
                            <a className={"ev-description-source-link"} href={"http://www.google.de"}>View Source</a>
                        </div>
                    </div>
                    <div>
                        <div className={"ev-batches"}>
                            <MetricBatchComponent size="big" value="0.9" field="Importance"/>
                            <MetricBatchComponent size="big" value="0.9" field="Importance"/>
                        </div>
                        <div className={"ev-batches"}>
                            <MetricBatchComponent size="medium" value="+5" field="Sentiment"/>
                            <MetricBatchComponent size="medium" value="10/10/2019" field="Day of Occurance"/>
                            <MetricBatchComponent size="medium" value="10:10" field="Time"/>
                        </div>
                    </div>
                    <div className={"ev-actors"}>
                        <div className={"ev-actors-header"}> Actors</div>
                        <ActorBatchComponent actor={{"name": "Republic of Kyrgyztan", "type": "Police"}}/>
                        <ActorBatchComponent actor={{"name": "Republic of Kyrgyztan", "type": "Police"}}/>
                    </div>
                    <div className={"ev-show-on-map"}>
                        <Button variant="outline-primary">Show on Map</Button>
                    </div>
                </div>
            </div>
        )
    }
}