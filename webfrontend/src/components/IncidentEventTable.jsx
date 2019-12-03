import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import EventStore from "../stores/event.store";
import EventAction from "../actions/event.actions";
import eventStore from '../stores/event.store';

export default class Incident extends Component {

    constructor(props){
        super(props);

        this.state = {
            posts: []
        }
        this.onFetchEvents = this.onFetchEvents.bind(this);
        this.state = {
            number: 0,
            events: [],
            activeEvent: EventStore.getEvents()
        };
    }

    componentDidMount() {
        // const url = "https://jsonplaceholder.typicode.com/posts"; 
        // fetch(url, {
        //     method: "GET"
        // }).then(response => response.json()).then(posts =>{
        //     this.setState({posts: posts})
        // })
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
        this.setState({posts:eventStore.getEvents()});
    }

    onFetchEvents(){
        this.setState({
            events: EventStore.getEvents()
        })
    }

    render () {
        const columns = [
            {
                Header: "ID",
                accessor: "id",
                width: 80,
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Importance",
                accessor: "userId",
                width: 50,
                sortable: true
                
            },
            {
                Header: "Next Location",
                accessor: "title",
                width: 200,
                filterable: true
            },
            {
                Header: "Name",
                accessor: "body",
                filterable: true
            },
            {
                Header: "Actors",
                accessor: "body",
                filterable: true
            },
            {
                Header: "Country",
                accessor: "body",
                filterable: true
                
            },
        ];
        const data = this.state.posts;
        console.log(data);
        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {
                    console.log('It was in this row:', rowInfo)
                }
            }
        }
        return (
            
            <div className="eventTable">
                <ReactTable
                    columns={columns}
                    data={data}
                    style={{
                        height:"570px"
                    }}
                    defaultPageSize={20}
                    showPagination={false}
                    getTrProps={onRowClick}
                    filterable
                >
                    
                </ReactTable>
            </div>
        )
    }
}