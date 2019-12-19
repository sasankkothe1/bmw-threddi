import React, {Component} from 'react';

import EventStore from "../../stores/event.store";
import EventAction from "../../actions/event.actions";
import MapComponent from "../../components/mapComponent/MapComponent";
import EventSidebar from "../../components/eventSidebarComponent/EventSidebar";
import AdditionalInformationModalComponent
    from "../../components/additionalInformationModal/AdditionalInformationModalComponent";

export default class Home extends Component {
    render() {
        return (
            <div className="wrap">
                <div className="fleft">
                    <MapComponent events={this.state.events.slice(0, 100)}
                                  activeElement={this.state.activeEvent}/>
                </div>
                <div className="fright">
                    <EventSidebar activeEvent={this.state.activeEvent}
                                  mode={"list"}
                                  onRemoveActiveEvent={() => this.onRemoveActiveEvent()}/>
                </div>
                <div>
                    <AdditionalInformationModalComponent activeEvent={this.state.activeEvent}/>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            events: [],
            activeEvent: EventStore.getActiveEvent(),
            shouldLoad: true
        };

        this.onFetchEvents = this.onFetchEvents.bind(this);
        this.onNewActiveEvent = this.onNewActiveEvent.bind(this);
        this.recursiveLoad = this.recursiveLoad.bind(this);

        EventAction.fetchEvents()
    }

    componentDidMount() {
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
        EventStore.addChangeListener("UPDATE_ACTIVE_EVENT", this.onNewActiveEvent);

    }

    componentWillMount() {
        this.setState({shouldLoad: true})
    }

    componentWillUnmount() {
        EventStore.removeChangeListener("FETCH_EVENTS", this.onFetchEvents);
        EventStore.removeChangeListener("UPDATE_ACTIVE_EVENT", this.onNewActiveEvent);
        this.setState({shouldLoad: false})
    }

    onChangeActiveEvent(event) {
        EventAction.updateActiveEvent(event);
    }

    recursiveLoad() {
        if (this.state.shouldLoad) {
            setTimeout(() => {
                let events = EventStore.getEvents();
                let hasMore = this.state.events.length + 1 < EventStore.getNumberOfEvents();
                this.setState((prev, props) => ({
                    items: events.slice(0, prev.events.length + 1)
                }));
                if (hasMore && this.state.shouldLoad) this.recursiveLoad();
            }, 0);
        }

    }

    onFetchEvents() {
        this.setState({
            events: EventStore.getEvents()
        })
    }

    onRemoveActiveEvent() {
        EventAction.updateActiveEvent(null)
    }

    onNewActiveEvent() {
        this.setState({
            activeEvent: EventStore.getActiveEvent()
        })
    }
}