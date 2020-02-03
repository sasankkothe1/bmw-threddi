import React, {Component} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import EventStore from "../stores/event.store";
import EventAction from "../actions/event.actions";
import Search from './Search';
import moment from "moment";

export default class IncidentEventTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            data: [],
            events: [],
            activeEvent: null,
            filteredData: [],
            searchInput: ""
        };
        this.onFetchEvents = this.onFetchEvents.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.getTrProps = this.getTrProps.bind(this);

    }

    componentDidMount() {
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);

        EventAction.fetchEvents();
        if (this.state.events.length < 1) {
            EventAction.fetchEvents();
        }
    }

    componentWillUnmount() {
        EventStore.removeChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }

    onFetchEvents() {
        let events = EventStore.getEvents();
        this.setState({
            events: EventStore.getEvents(),
            data: events
                .map((event) => event._source)
                .map((event) => ({
                    ...event,
                    'timestamp': moment(event.timestamp, "YYYYMMDDHHmmSS").format("DD/MM/YYYY")
                }))
                .map((event) => ({...event, 'time': moment(event.timestamp, "YYYYHHDDHHmmSS").format("hh:mm")}))
                .map((event) => ({
                    ...event,
                    'distance_to_next_location': event['location_info'] ? event['location_info']['distance'] + " km" : "-"
                }))
                .map((event) => (
                    {
                        ...event,
                        'next_location': event['location_info'] ? event['location_info']['name'] : "-"
                    }
                ))
                .map((event) => (
                    {
                        ...event,
                        'location_id': event['location_info'] ? event['location_info']['location_id'] : "-"
                    }
                ))

        })
    }

    getTrProps(state, rowInfo, column, instance) {
        return {
            onClick: e => this.onRowClick(rowInfo)
        }
    }

    onRowClick(rowInfo) {
        this.props.onChangeActiveEvent(rowInfo.row._original);
    }

    handleSetFilteredData = filteredData => {
        this.setState({filteredData});
    };

    handleSetSearchInput = searchInput => {
        this.setState({searchInput});
    };

    render() {


        const columns = [
            {
                Header: "Importance",
                accessor: "importance",
                width: 110
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "ID",
                accessor: "id",
                width: 190
            },
            {
                Header: "Sentiment Group",
                accessor: "sentiment_group",
                width: 160
            },
            {
                Header: "Date Occured",
                accessor: 'timestamp',
                width: 125
            },
            {
                Header: "Time",
                accessor: "time",
                width: 60
            },
            // {
            //     Header: "Country",
            //     accessor: "body",
            //     filterable: true
            // },
            {
                Header: "Source URL",
                accessor: "url",
                width: 200
            },
            {
                Header: "LAT",
                accessor: "lat",
                show: false
            },
            {
                Header: "Distance to next Location",
                accessor: "distance_to_next_location",
                width: 80,
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Next Location",
                accessor: "next_location",
                width: 80,
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Location ID",
                accessor: "location_id",
                width: 80,
                style: {
                    textAlign: "center"
                }
            }
            // {
            //     Header: "Source Origin",
            //     accessor: "origin",
            //     width: 200,
            //     filterable: true
            // },
        ];
        let {data, filteredData, searchInput} = this.state;
        const dataToDisplay = searchInput.length ? filteredData : data;
        return (
            <div className="tablePage">
                <div className="searchField">
                    <Search
                        columns={columns}
                        data={this.state.data}
                        handleSetFilteredData={this.handleSetFilteredData}
                        handleSetSearchInput={this.handleSetSearchInput}
                    >
                    </Search>
                </div>
                {/*{console.log(this.state.events?this.state.events[0]._source : " ")}*/}
                {
                    this.state.events[0] ? (

                        <ReactTable
                            className="-striped -highlight"
                            columns={columns}
                            data={dataToDisplay}
                            defaultPageSize={-1}
                            showPagination={false}
                            getTrProps={this.getTrProps}
                        >

                        </ReactTable>) : ""}
            </div>
        )
    }
}