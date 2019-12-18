import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import EventStore from "../stores/event.store";
import EventAction from "../actions/event.actions";
import eventStore from '../stores/event.store';
import moment from "moment";

export default class Incident extends Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            events: EventStore.getEvents(),
            activeEvent: null,
        };

        this.onFetchEvents = this.onFetchEvents.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.getTrProps = this.getTrProps.bind(this);

    }

    componentDidMount() {
        // const url = "https://jsonplaceholder.typicode.com/posts"; 
        // fetch(url, {
        //     method: "GET"
        // }).then(response => response.json()).then(posts =>{
        //     this.setState({posts: posts})
        // })
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);

        if (this.state.events.length < 1) {
            EventAction.fetchEvents();
        }

    }

    componentWillUnmount() {
        EventStore.removeChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }

    onFetchEvents() {
        this.setState({
            events: EventStore.getEvents()
        })
    }

    getTrProps(state, rowInfo, column, instance){
        return {
            onClick: e => this.onRowClick(rowInfo)
        }

    }

    onRowClick (rowInfo){
        console.log('It was in this row:', rowInfo.row._original);
        this.props.onChangeActiveEvent(rowInfo.row._original)
    }

    render() {

        const columns = [
            // {
            //     Header: "Actor",
            //     accessor: "actor",
            //     width: 80,
            //     style: {
            //         textAlign: "center"
            //     }
            // },
            {
                Header: "Importance",
                accessor: "importance",
                width: 110,
                sortable: true
            },
            {
                Header: "Description",
                accessor: "description",
                filterable: true
            },
            {
                Header:"ID",
                accessor: "id",
                filterable: true,
                width: 190
            },
            {
                Header:"Sentiment Group",
                accessor: "sentiment_group",
                filterable: true,
                width:160
            },    
            {
                Header:"Date Occured",
                accessor: 'timestamp',
                filterable: true,
                width:125
            },    
            // {
            //     Header: "Country",
            //     accessor: "body",
            //     filterable: true
            // },
            {
                Header: "Source URL",
                accessor: "url",
                width: 200,
                filterable: true
            }
            // {
            //     Header: "Source Origin",
            //     accessor: "origin",
            //     width: 200,
            //     filterable: true
            // },
        ];

        return (

            <div className="none">
                {/*{console.log(this.state.events?this.state.events[0]._source : " ")}*/}
                {
                    this.state.events[0] ? (

                    <ReactTable
                    className="-striped -highlight"
                        columns={columns}
                        data={this.state.events
                            .map((event)=> event._source)
                            .map((event)=> ({...event, 'timestamp':moment(event.timestamp, "YYYYMMDDHHmmSS" ).format("DD/MM/YYYY")}))
                    }
                        defaultPageSize={-1}
                        showPagination={false}
                        getTrProps={this.getTrProps}
                        filterable
                    >

                    </ReactTable>) : ""}
            </div>
        )
    }
}