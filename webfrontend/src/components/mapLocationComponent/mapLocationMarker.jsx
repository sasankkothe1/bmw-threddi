import React, {Component} from 'react';
import './mapLocationMarker.css';
import Card from "react-bootstrap/Card";
import MetricBatchComponent from "../metricBatchComponent/MetricBatchComponent";
import LocationAction from "../../actions/location.actions";

export default class MapLocationMarker extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        LocationAction.updateActiveLocation(this.props.location._id)
    }

    render() {
        return (
            <div>
                <i className={"fas fa-industry fa-3x map-location-marker"}
                   onClick={this.onClick}
                   // onMouseOver={this.onHover}
                   lat={this.props.lat}
                   lng={this.props.lng}/>
                {this.props.isActive?
                    <Card className={"info-window"}>
                        <Card.Header>{this.props.location._source.mainLocation.location_type}</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.props.location._source.mainLocation.location_id.replace("_"," ")}</Card.Title>
                            <hr className="horizontal-line"/>
                            <div className={"location-info"}>
                                <div className={"location-description"}>{this.props.location._source.mainLocation.description}</div>
                                <MetricBatchComponent size="big"
                                                      value={this.props.location._source.mainLocation.priority}
                                                      field="Priority"/>
                            </div>
                            <hr className="horizontal-line"/>
                            <button type="button" className="btn btn-link">Show details</button>
                        </Card.Body>
                    </Card> : ""}
                {/**/}
            </div>
        )
    }
}