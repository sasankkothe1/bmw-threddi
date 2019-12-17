import React, {Component} from 'react';
import LocationTable from './LocationTable.jsx';
import LocationStore from '../../stores/location.store';
import Button from 'react-bootstrap/Button';
import LocationFormModal from "../locationFormModalComponent/LocationFormModal";
import LocationActions from "../../actions/location.actions";
import "./FilterableLocationTable.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";


// clear blocks to avoid mess up with other rows below

export default class FilterableLocationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModalShow: false,
            locations: []
        };

        LocationActions.getLocation();

        this.updateLocations = this.updateLocations.bind(this)
    }

    componentWillMount() {
        LocationStore.addChangeListener("GET_LOCATIONS", this.updateLocations)
    }

    updateLocations() {
        console.log("Update it");
        this.setState({
            locations: LocationStore.getLocations()
        })
    }

    render() {
        let addModalClose = () => this.setState({addModalShow: false});

        return (
            <div className="FilterableLocationTableDiv">
                <div className="wrapper-search-bar">
                    <div className="search-bar">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="filter-field">Filter</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Filter Locations"
                                aria-label="Filter Locations"
                                aria-describedby="filter-field"
                            />
                        </InputGroup>
                    </div>
                    <Button variant='success' onClick={() => this.setState({addModalShow: true})}>
                        Add location </Button>
                </div>

                <LocationTable locations={this.props.locations}/>
                <LocationFormModal
                    show={this.state.addModalShow}
                    onHide={addModalClose}/>
            </div>)
    }

}
