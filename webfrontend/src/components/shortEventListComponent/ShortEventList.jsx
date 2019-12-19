import React, {Component} from 'react';
import './ShortEventList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import EventStore from "../../stores/event.store";
import EventAction from "../../actions/event.actions";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import BaseTable from "react-base-table";
import Column from "react-base-table/es/Column";
import AutoResizer from "react-base-table/es/AutoResizer";


export default class ShortEventList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.onFetchEvents = this.onFetchEvents.bind(this)

    }

    componentWillMount() {
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }
    componentDidMount() {
        this.recursiveLoad()
    }

    onFetchEvents() {
        this.recursiveLoad();
    }

    componentWillUnmount() {
        EventStore.removeChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }

    recursiveLoad() {
        setTimeout(() => {
            let event_length = EventStore.getNumberOfEvents();
            let hasMore = this.state.data.length + 1 < event_length;
            this.setState((prev, props) => {
                let data = EventStore.getEvents().slice(0, prev.data.length + 5)
                    .map((value) => value._source)
                    .map((value) => {
                        return {
                            "description": value.description,
                            "importance": value.importance,
                            "sentiment_group": value.sentiment_group,
                            "occured": moment(value.timestamp, "YYYYMMDDHHmmSS").fromNow(),
                            "id": value.id

                        }
                    });
                return {data}
            });

            if (hasMore) this.recursiveLoad();
        }, 0);

    }

    render() {

        let columns = this.state.data[0] ? Object.keys(this.state.data[0])
            .map((column) => {
                return {text: column, dataField: column, sort: true}
            }) : {};

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                EventAction.updateActiveEvent(EventStore.getEvents().filter(event => {
                    return event._source ? event._source.id === row.id : null
                })[0]._source)
            },
            onMouseEnter: (e, row, rowIndex) => {
                EventAction.updateHoveredEvent(EventStore.getEvents().filter(event => event._source ? event._source.id === row.id : null)[0]._source)
            },
            onMouseLeave: (e, row, rowIndex) => {
                EventAction.updateHoveredEvent(null)
            }
        };

        return (
            <div className="short-event-list-wrapper">
                {this.state.data[0]?
                    (<BootstrapTable
                        keyField={"id"}
                        columns={columns}
                        data={this.state.data}
                        rowEvents={rowEvents}
                        hover
                        />)
                    :
                    (<div className={"central_spinner"}>
                        <Spinner animation="border"/>
                    </div>)
                }
            </div>)
    }
}