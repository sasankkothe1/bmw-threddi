import React, {Component} from 'react';
import './ShortEventList.css';
import BootstrapTable from 'react-bootstrap-table-next';
import EventStore from "../../stores/event.store";
import moment from "moment";
import * as flat from "flat";

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

        console.log(this.state.data);
        let data = this.state.data
            .map((value)=>value._source)
            .map((value)=>{return {
                "id": value.id,
                "importance": value.importance,
                "sentiment_group": value.sentiment_group,
                "description": value.description,
                "occured": moment(value.timestamp, "YYYYMMDDHHmmSS" ).fromNow(),
            }});

        let columns = data[0]?Object.keys(data[0])
            .map((column)=>{return {text: column, dataField: column, sort:true}}):{};

        const rowEvents={
            onClick: (e, row, rowIndex) => {
                alert(row)
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
                        style={{
                            height: "100%"
                        }}>

                    </BootstrapTable>:""
                }
            </div>
        )
    }
}