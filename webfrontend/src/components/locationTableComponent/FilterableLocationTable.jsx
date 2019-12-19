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
            locations: [],
            filter:""
        };

        LocationActions.getLocation();

        this.inputRef = React.createRef();
        this.updateLocations = this.updateLocations.bind(this);
        this.addModalClose= this.addModalClose.bind(this)
    }

    componentWillMount() {
        LocationStore.addChangeListener("GET_LOCATIONS", this.updateLocations);
        LocationStore.addChangeListener("POST_LOCATION_SUCCESSFUL", this.addModalClose)
    }

    componentWillUnount() {
        LocationStore.removeChangeListener("GET_LOCATIONS", this.updateLocations);
        LocationStore.removeChangeListener("POST_LOCATION_SUCCESSFUL", this.addModalClose)
    }

    updateLocations() {
        this.setState({
            locations: LocationStore.getLocations()
        })
    }

    handleFilterChange(){
        this.setState({filter: this.inputRef.current.value})
    }
    addModalClose(){
        this.updateLocations();
        this.setState({addModalShow: false});
    }
    render() {


        return (
            <div className="FilterableLocationTableDiv">
                <div className="wrapper-search-bar">
                    <div className="search-bar">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="filter-field" value={"hallo"}>Filter</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                ref={this.inputRef}
                                onChange={()=>this.handleFilterChange()}
                                placeholder="Filter Locations"
                                aria-label="Filter Locations"
                                aria-describedby="filter-field"
                            />
                        </InputGroup>
                    </div>
                    <Button variant='success' onClick={() => this.setState({addModalShow: true})}>
                        Add location </Button>
                </div>

                <LocationTable locations={this.state.locations.filter((location)=>this.state.filter?location._source.mainLocation.location_id.toLowerCase().replace("_"," ").includes(this.state.filter.toLowerCase()):true)}/>
                <LocationFormModal
                    show={this.state.addModalShow}
                    onHide={this.addModalClose}/>
            </div>)
    }

}
