import React, {Component} from "react";

/* Import Components */
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import Button from "./Button";

import LocationStore from "../../stores/location.store";

import LocationActions from "../../actions/location.actions";
import Alert from "react-bootstrap/Alert";


class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newLocation: {
                name: "",
                address: "",
                locationType: "",
                description: "",
                priority: ""
            },
            showError: false,
            error_msg: "",

            locationTypeOptions: ["Production facility", "Exhibition hall", "Research facility"],
        };
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handlePriority = this.handlePriority.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    /* This lifecycle hook gets executed when the component mounts */

    handleName(e) {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newLocation: {
                    ...prevState.newLocation,
                    name: value
                }
            }),
            () => console.log(this.state.newLocation)
        );
    }

    handleError() {
        this.setState({showError: true, error_msg: LocationStore.getLocationError()})
    }

    locationCreated(value) {
        console.log(value)
    }

    handleAddress(e) {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newLocation: {
                    ...prevState.newLocation,
                    address: value
                }
            }),
            () => console.log(this.state.newLocation)
        );
    }

    handlePriority(e) {
        let value = e.target.value;
        this.setState(
            prevState => ({
                newLocation: {
                    ...prevState.newLocation,
                    priority: value
                }
            }),
            () => console.log(this.state.newLocation)
        );
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            prevState => ({
                newLocation: {
                    ...prevState.newLocation,
                    [name]: value
                }
            })
        );
    }

    handleTextArea(e) {
        console.log("Inside handleTextArea");
        let value = e.target.value;
        this.setState(
            prevState => ({
                newLocation: {
                    ...prevState.newLocation,
                    description: value
                }
            }),
            () => console.log(this.state.newLocation)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.newLocation;

        fetch("http://example.com", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            response.json().then(data => {
                console.log("Successful" + data);
            });
        });
    }

    handleClearForm(e) {
        e.preventDefault();
        this.setState({
            newLocation: {
                name: "",
                address: "",
                locationType: "",
                description: "",
                priority: ""
            }
        });
    }


    render() {
        return (
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>

                <Input
                    inputtype={"text"}
                    title={"Location name"}
                    name={"name"}
                    value={this.state.newLocation.name}
                    placeholder={"Enter the location name"}
                    onChange={this.handleInput}
                />{" "}
                {/* Name of the user */}
                <Input
                    inputtype={"text"}
                    name={"address"}
                    title={"Address"}
                    value={this.state.newLocation.address}
                    placeholder={"Enter the address information of the location"}
                    onChange={this.handleAddress}
                />{" "}
                {/* Address information */}
                <Select
                    title={"Location Type"}
                    name={"locationType"}
                    options={this.state.locationTypeOptions}
                    value={this.state.newLocation.locationType}
                    placeholder={"Select Location Type"}
                    onChange={this.handleInput}
                />{" "}
                {/* Location type selection */}
                <Input
                    inputtype={"number"}
                    name={"priority"}
                    title={"Priority"}
                    value={this.state.newLocation.priority}
                    placeholder={"Enter the priority for given location"}
                    onChange={this.handlePriority}
                />{" "}
                {/* Priority information */}
                <TextArea
                    title={"Description"}
                    rows={10}
                    value={this.state.newLocation.about}
                    name={"currentLocationInfo"}
                    onChange={this.handleTextArea}
                    placeholder={"Description of the new location."}
                />
                {/* About you */}
                <Button
                    action={this.handleFormSubmit}
                    type={"primary"}
                    title={"Submit"}
                    style={buttonStyle}
                />{" "}
                <Button
                    action={this.handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                    style={buttonStyle}
                />{" "}
                {this.state.showError ?
                    <Alert variant={"danger"}>
                        {this.state.error_msg.toString()}
                    </Alert> : ""}
            </form>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default FormContainer;
