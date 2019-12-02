import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import config from '../../config';

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {},
            initialCenter: {
                lat: 48.148640,
                lng: 11.574844
            }
        };

        this.map = React.createRef();
        this.onMarkerClick = this.onMarkerClick.bind(this);

    }

    onMarkerClick(props, marker, e) {
        console.log(props);
        this.props.onChangeActiveRequest(props.event._source)
    }


    render() {
        return (
            <Map google={this.props.google}
                // TODO ADD HEIGHT OF HEADER
                 containerStyle={{width: '100%', height: 'calc(100vh - 120px)', position: 'relative'}}
                 zoom={3}
                 initialCenter={this.state.initialCenter}
                 ref={this.map}
                 center={
                     this.state.center
                 }
            >
                {this.props.events ? (
                    this.props.events.map((event, i) => {
                            return (
                                <Marker
                                    key={i}
                                    event={event}
                                    position={{
                                        lat: event._source.lat,
                                        lng: event._source.long
                                    }}
                                    onClick={this.onMarkerClick}
                                />)
                        }
                    )) : ""}

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (config.GOOGLE_MAPS_API_KEY)
})(MapComponent)

