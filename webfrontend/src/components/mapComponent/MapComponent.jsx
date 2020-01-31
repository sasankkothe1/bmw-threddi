import React, {Component} from 'react';
import config from '../../config';
import GoogleMapReact from 'google-map-react'
import MapMarker from "../mapMarkerComponent/mapMarker";
import EventAction from "../../actions/event.actions";
import EventStore from "../../stores/event.store";
import MapLocationMarker from "../mapLocationComponent/mapLocationMarker";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./MapComponent.css"
import SearchBar from "../locationTableComponent/SearchBar";
import Input from "../locationFormComponent/Input";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import EventSearcher from "../../services/event.searcher";


class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {},
            zoom: 1,
            initialCenter: {
                lat: 0,
                lng: 0
            },
            searchString: "",
            showHeatmap: true,
            showEvents: true,
            showFactories: true,
            show: false,
            hoveredEvent: null,
            events: [],
            heatmapData: [],
            toggle_value: ["show_location", "show_heatmap", "show_events"],
            searchInput: ''
        };


        this.map = React.createRef();

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.recursiveLoad = this.recursiveLoad.bind(this);
        this.onNewHoveredEvent = this.onNewHoveredEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.recursiveLoad = this.recursiveLoad.bind(this);
        this.onNewHoveredEvent = this.onNewHoveredEvent.bind(this);
    }

    recursiveLoad() {
        setTimeout(() => {
            let event_length = EventStore.getNumberOfEvents();
            let hasMore = this.state.events.length + 1 < event_length;

            this.setState((prev, props) => {
                let events = EventStore.getEvents().slice(0, prev.events.length + 4);
                let heatmapData = EventSearcher.getSearchedEvents(events, this.state.searchText)
                // let heatmapData = events
                    .map((event) => {
                        return {
                            lat: event._source.lat,
                            lng: event._source.long,
                            weight: event._source.importance
                        }
                    })
                    .filter(event => event.lat && event.lng && event.weight);
                return {
                    events: events,
                    heatmapData: heatmapData
                };
            });

            if (hasMore) this.recursiveLoad();
        }, 0);

    }

    isActive(event) {
        if (event && this.props.activeElement) {
            return event._source.id === this.props.activeElement.id
        }
        return false
    }

    isActiveLocation(location) {
        if (location && this.props.activeLocation) {
            return location._id === this.props.activeLocation;
        }
        return false
    }

    isHovered(event) {
        if (event && this.state.hoveredEvent) {
            return event._source.id === this.state.hoveredEvent.id;
        }
        return false
    }

  componentWillMount() {
      EventStore.addChangeListener(
        "UPDATE_HOVERED_EVENT",
        this.onNewHoveredEvent
      );
      EventStore.addChangeListener("UPDATE_HOVERED_EVENT", this.onNewHoveredEvent);
      EventStore.addChangeListener("FETCH_EVENT", this.getFetchedEvent);

      this.recursiveLoad();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(
      "UPDATE_HOVERED_EVENT",
      this.onNewHoveredEvent
    );
    EventStore.removeChangeListener("FETCH_EVENT", this.getFetchedEvent);
    EventStore.removeChangeListener("FETCH_EVENT", this.getFetchedEvent);

  }
  onNewHoveredEvent() {
    this.setState({ hoveredEvent: EventStore.getHoveredEvent() });
  }
  componentDidMount() {}

    getFetchedEvent() {
        this.recursiveLoad()
    }

    changeSearchString(e) {
        this.setState({searchString: e.target.value});
        this.props.changeEventSearchtext(e.target.value);
    }

    render() {
        if(this.state.events.length===0)
            this.recursiveLoad();

        return (
            <>
                <div className="searchInput">
                    <input
                        className="searchInputField"
                        name="searchInput"
                        value={this.state.searchInput || ""}
                        onChange={this.handleChange}
                        placeholder="Search"
                    />
                </div>
                <div className={"toolbar"}>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Search for</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onChange={(e) => this.changeSearchString(e)}
                                placeholder="Tags"
                                aria-label="tags"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </div>
                    <ToggleButtonGroup type="checkbox" value={this.state.toggle_value}
                                       onChange={(val) => this.setState({toggle_value: val})} name={"show_toggles"}>

                        <ToggleButton value={"show_events"}>Show Events</ToggleButton>
                        <ToggleButton value={"show_heatmap"}>Show Heatmap</ToggleButton>
                        <ToggleButton value={"show_location"}>Show Locations</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div style={{height: '100%', width: '100%'}} id="mapBox">

                    <GoogleMapReact
                        heatmapLibrary={true}
                        heatmap={this.state.toggle_value.includes('show_heatmap') ?
                            {
                                positions: this.state.heatmapData,
                                options: {
                                    radius: 20,
                                    opacity: 0.6
                                }
                            } : {positions: []}}
                        bootstrapURLKeys={{key: config.GOOGLE_MAPS_API_KEY}}
                        zoom={this.state.zoom}
                        center={this.state.initialCenter}
                        onClick={() => {
                            EventAction.updateActiveEvent(null);
                            EventAction.updateHoveredEvent(null);
                            this.setState({activeLocationMarker: null})
                        }}
                        ref={this.map}
                    >
                        {this.state.events && this.state.toggle_value.includes("show_events") ? (
                            EventSearcher.getSearchedEvents(this.state.events, this.state.searchString).map((event, i) => {
                                if (event._source.lat) {
                                    return (
                                        <MapMarker lat={event._source.lat}
                                                   lng={event._source.long}
                                                   event={event}
                                                   isHovered={this.isHovered(event)}
                                                   isActive={this.isActive(event)}
                                                   key={i}/>)
                                }
                                return ""
                            })) : ""
                        }
                        {this.props.locations && this.state.toggle_value.includes("show_location") ? (
                            this.props.locations.map((location, i) => {
                                return (
                                    <MapLocationMarker lat={location._source.mainLocation.lat}
                                                       lng={location._source.mainLocation.long}
                                                       location={location}
                                                       isActive={this.isActiveLocation(location)}
                                                       key={i}/>)
                            })) : ""}
                    </GoogleMapReact>
                </div>
            </>
        )
    }

}

export default MapComponent


