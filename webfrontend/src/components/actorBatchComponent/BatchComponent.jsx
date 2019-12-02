import React, {Component} from 'react';
import './BatchComponent.css';

export default class BatchComponent extends Component {
    _firstField = "NotDefined";
    _secondField = "NotDefined";
    _firstValue = "NotDefined";
    _secondValue = "NotDefined";


    constructor(props){
        super(props);

        if(this.props.element) {
            let keys = Object.keys(this.props.element);
            let values = Object.values(this.props.element);
            this._firstField = keys[0];
            this._secondField = keys[1];
            this._firstValue = values[0];
            this._secondValue = values[1];
        }

    }
    render() {
        return (
            <div className={"batch"}>
                <div className={"batch-field-names"}>
                    <div> {this._firstField}</div>
                    {this._secondField? <div> {this._secondField}</div>:""}
                </div>
                <div className={"batch-field-values"}>
                    <div> {this._firstValue}</div>
                    {this._secondField?<div> {this._secondValue}</div>:""}
                </div>
            </div>
        )
    }
}