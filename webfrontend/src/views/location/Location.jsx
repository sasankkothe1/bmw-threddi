import React, {Component} from 'react';

import FilterableLocationTable from '../../components/locationTableComponent/FilterableLocationTable';
import Image from "../../components/pictures/graph_events_locationView.png";
import LocationStore from "../../stores/location.store";
import Toast from "react-bootstrap/Toast";
import {Line} from "react-chartjs-2";
import { Button } from "react-bootstrap";

export default class Location extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postInfo: false
        };

        this.showPostInfo = this.showPostInfo.bind(this);
        this.successfullyCreatedLocation = this.successfullyCreatedLocation.bind(this);
    }

    componentWillMount() {
        LocationStore.addChangeListener("POST_LOCATION_SUCCESSFUL", this.successfullyCreatedLocation)
    }
    componentWillUnmount() {
        LocationStore.removeChangeListener("POST_LOCATION_SUCCESSFUL", this.successfullyCreatedLocation)
    }

    successfullyCreatedLocation() {
        console.log("Created successfully");
        this.showPostInfo(true);
    }

    showPostInfo(show) {
        this.setState({postInfo: show});
    }

    render() {

        const mockdata= {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "Historical Events",
                backgroundColor: 'rgb(29,88,132)',
                borderColor: 'rgb(50,85,255)',
                data: [100, 150, 125, 650, 30, 230, 500],
            }]
        };

        return (
            <>
                <Toast onClose={() => this.showPostInfo(false)} show={this.state.postInfo} className={"toast"} delay={3000} autohide>
                    <Toast.Header>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body>The location was created successful</Toast.Body>
                </Toast>
                <div className="page-content">
                    <div className="location-table-wrapper">
                        <FilterableLocationTable/>
                    </div>
                    <div className="picture-container-wrapper">
                      <div className="picture-container">
                        <Line
                            data={mockdata}
                            height={500}
                            width={700}
                        />
                      </div>
                        {/*<div className="picture">*/}
                        {/*    <img src={Image} alt="website logo" height={400} width={'auto'}/>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="page-container-button-bar-bottom">
                  <Button variant="primary">Primary</Button>
                </div>
            </>
        )
    }
}
