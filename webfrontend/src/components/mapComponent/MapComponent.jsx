import React, { Component } from "react";
import config from "../../config";
import GoogleMapReact from "google-map-react";
import MapMarker from "../mapMarkerComponent/mapMarker";
import EventAction from "../../actions/event.actions";
import EventStore from "../../stores/event.store";

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
      show: false,
      activeMarker: null,
      hoveredEvent: null,
      events: [],
      searchInput: ''
    };

    this.map = React.createRef();

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.recursiveLoad = this.recursiveLoad.bind(this);
    this.onNewHoveredEvent = this.onNewHoveredEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  recursiveLoad() {
    setTimeout(() => {
      let event_length = EventStore.getNumberOfEvents();
      let hasMore = this.state.events.length + 1 < event_length;
      this.setState((prev, props) => ({
        events: EventStore.getEvents().slice(0, prev.events.length + 4)
      }));
      if (hasMore) this.recursiveLoad();
    }, 0);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      activeMarker: marker,
      show: true,
      zoom: 3
    });
    this.props.onChangeActiveEvent(props.event._source);
  }

  isActive(event) {
    if (event && this.props.activeElement) {
      return event._source.id === this.props.activeElement.id;
    }
    return false;
  }

  isHovered(event) {
    if (event && this.state.hoveredEvent) {
      return event._source.id === this.state.hoveredEvent.id;
    }
    return false;
  }

  componentWillMount() {
    EventStore.addChangeListener(
      "UPDATE_HOVERED_EVENT",
      this.onNewHoveredEvent
    );
    EventStore.addChangeListener("FETCH_EVENT", this.getFetchedEvent);
    this.recursiveLoad();
  }

  componentWillUnmount() {
    EventStore.removeChangeListener(
      "UPDATE_HOVERED_EVENT",
      this.onNewHoveredEvent
    );
    EventStore.removeChangeListener("FETCH_EVENT", this.getFetchedEvent);
  }
  onNewHoveredEvent() {
    this.setState({ hoveredEvent: EventStore.getHoveredEvent() });
  }
  componentDidMount() {}

  getFetchedEvent() {
    this.recursiveLoad();
  }

  handleChange = event => {
      event.preventDefault();
    const val = event.target.value;
    this.setState({ searchInput: val });
    //this.props.handleSetSearchInput(val);
  };
  render() {
    if (this.state.events.length === 0) this.recursiveLoad();

    return (
      <div style={{ height: "100%", width: "100%" }} id="mapBox">
        <div className="searchInput">
          <input
            className="searchInputField"
            name="searchInput"
            value={this.state.searchInput || ""}
            onChange={this.handleChange}
            placeholder="Search"
          />
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.GOOGLE_MAPS_API_KEY }}
          zoom={this.state.zoom}
          center={this.state.initialCenter}
          onClick={() => {
            EventAction.updateActiveEvent(null);
            EventAction.updateHoveredEvent(null);
          }}
          ref={this.map}
        >
          {this.state.events
            ? this.state.events.map((event, i) => {
                if (event._source.lat) {
                  return (
                    <MapMarker
                      lat={event._source.lat}
                      lng={event._source.long}
                      event={event}
                      isHovered={this.isHovered(event)}
                      isActive={this.isActive(event)}
                      key={i}
                    />
                  );
                }
                return "";
              })
            : ""}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapComponent;
