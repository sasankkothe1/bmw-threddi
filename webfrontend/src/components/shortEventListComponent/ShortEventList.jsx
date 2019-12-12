import React, {Component} from 'react';
import './ShortEventList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import EventStore from "../../stores/event.store";
import EventAction from "../../actions/event.actions";
import moment from "moment";


export default class ShortEventList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: EventStore.getEvents()
        };

        this.onFetchEvents = this.onFetchEvents.bind(this)

    }

    componentWillMount() {
        EventStore.addChangeListener("FETCH_EVENTS", this.onFetchEvents);
    }

    onFetchEvents() {
        this.setState({data: EventStore.getEvents()})
    }

    render() {

        let data = this.state.data
            .map((value)=>value._source)
            .map((value)=>{return {
                "id": value.id,
                "importance": value.importance,
                "sentiment_group": value.sentiment_group,
                "occured": moment(value.timestamp, "YYYYMMDDHHmmSS" ).fromNow(),
            }});

        let columns = data[0]?Object.keys(data[0])
            .map((column)=>{return {text: column, dataField: column, sort:true}}):{};

        const rowEvents={
            onClick: (e, row, rowIndex) => {
                EventAction.updateActiveEvent(this.state.data.filter(event=>event._source?event._source.id===row.id:null)[0]._source)
            },
            onMouseEnter: (e, row, rowIndex) =>{
                EventAction.updateHoveredEvent(this.state.data.filter(event=>event._source?event._source.id===row.id:null)[0]._source)
            },
            onMouseLeave:(e, row, rowIndex) =>{
                EventAction.updateHoveredEvent(null)
            }
        };

        return (
            <div>
                {data[0]?
                    <BootstrapTable
                        keyField={"id"}
                        columns={columns}
                        data={data}
                        rowEvents={rowEvents}
                        hover
                        style={{
                            height: "100%"
                        }}>

                    </BootstrapTable>:""
                }
            </div>
        )
    }
}