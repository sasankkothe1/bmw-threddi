import React, {Component} from 'react';
import config from '../../config';
import GoogleMapReact from 'google-map-react'
import MapMarker from "../mapMarkerComponent/mapMarker";
import EventAction from "../../actions/event.actions";
import EventStore from "../../stores/event.store";

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {},
            zoom:1,
            initialCenter: {
                lat: 0,
                lng: 0
            },
            show: false,
            activeMarker: null,
            hoveredEvent: null,
            events:[]
        };

        this.map = React.createRef();

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.recursiveLoad = this.recursiveLoad.bind(this);
        this.onNewHoveredEvent = this.onNewHoveredEvent.bind(this);

    }

    recursiveLoad(){
        console.log(this.props.events);
        setTimeout(()=>{
            console.log(this.state.events.length + 1,  this.props.events.length);
            let hasMore = this.state.events.length + 1 < this.state.events.length;
            this.setState( (prev, props) => ({
                events: this.props.events.slice(0, prev.events.length + 4)
            }));
            console.log("test_map");
            if (hasMore) this.recursiveLoad();
        }, 0);

    }

    onMarkerClick(props, marker, e) {
        this.setState(
            {
                activeMarker: marker,
                show: true,
                zoom: 3
            });
        this.props.onChangeActiveEvent(props.event._source);

    }

    isActive(event){
        if(event && this.props.activeElement) {
            return event._source.id === this.props.activeElement.id
        }
        return false
    }

    isHovered(event){
        if(event && this.state.hoveredEvent) {
            return event._source.id === this.state.hoveredEvent.id
        }
        return false
    }
    componentWillMount() {
        EventStore.addChangeListener("UPDATE_HOVERED_EVENT", this.onNewHoveredEvent);
    }
    onNewHoveredEvent(){
        this.setState({ hoveredEvent: EventStore.getHoveredEvent()})
    }
    render() {
        this.recursiveLoad()
        return (
            <div style={{height: '100%', width: '100%'}} id="mapBox">
                <GoogleMapReact
                    bootstrapURLKeys={{key: config.GOOGLE_MAPS_API_KEY}}
                    zoom={this.state.zoom}
                    center={this.state.initialCenter}
                    onClick={()=>{
                        EventAction.updateActiveEvent(null);
                        EventAction.updateHoveredEvent(null);
                    }}
                    ref={this.map}
                >
                    {this.state.events ? (
                        this.state.events.map((event, i) => {
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
                </GoogleMapReact>
            </div>
        )
    }
}

export default MapComponent


