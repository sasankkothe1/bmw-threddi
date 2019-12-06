import React, {Component} from 'react';
import './BatchComponent.css';

export default class BatchComponent extends Component {
    constructor(props){
        super(props);

    }



    render() {
        return (
            <div className={"batch"}>
                <div className={"batch-field-names"}>
                    {Object.keys(this.props.element).map((key, index)=>{return (<div key={index}>{key.replace("_"," ")}</div>)})}
                </div>
                <div className={"batch-field-values"}>
                     {Object.values(this.props.element).map((value, index)=>{return (<div key={index}> {value}</div>)})}
                </div>
            </div>
        )
    }
}