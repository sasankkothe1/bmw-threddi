import React, {Component} from 'react';
import './MetricBatchComponent.css';

export default class MetricBatchComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={`metric-batch + batch-${(this.props.size || "big")}`}>
                <div className={`mb-value + value-${(this.props.size || "big")}`}>{this.props.value}</div>
                <div className={`mb-field + field-${(this.props.size || "big")}`}>{this.props.field}</div>
            </div>
        )
    }
}