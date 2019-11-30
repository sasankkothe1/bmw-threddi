import React, {Component} from 'react';
import './ActorBatchComponent.css';

export default class ActorBatchComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className={"actor-batch"}>
                <div className={"actor-field-names"}>
                    <div> Name</div>
                    <div> Type</div>
                </div>
                <div className={"actor-field-values"}>
                    <div> {this.props.actor.name}</div>
                    <div> {this.props.actor.type}</div>
                </div>
            </div>
        )
    }
}