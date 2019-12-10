import React, { Component } from "react";

/* Import Components */
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import Button from "./Button";

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newLocation: {
        name: "",
        address:"",
        locationType: "",
        description: "",
        priority: ""
      },

      locationTypeOptions: ["Production facility", "Exhibition hall", "Research facility"],
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePriority = this.handlePriority.bind(this)
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
      }),
      () => console.log(this.state.newLocation)
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
        address:"",
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
          inputType={"text"}
          title={"Location name"}
          name={"name"}
          value={this.state.newLocation.name}
          placeholder={"Enter the location name"}
          handleChange={this.handleInput}
        />{" "}
        {/* Name of the user */}
        <Input
          inputType={"text"}
          name={"address"}
          title={"Address"}
          value={this.state.newLocation.address}
          placeholder={"Enter the address information of the location"}
          handleChange={this.handleAddress}
        />{" "}
        {/* Address information */}
        <Select
          title={"Location Type"}
          name={"locationType"}
          options={this.state.locationTypeOptions}
          value={this.state.newLocation.locationType}
          placeholder={"Select Location Type"}
          handleChange={this.handleInput}
        />{" "}
        {/* Location type selection */}
        <Input
          inputType={"number"}
          name={"priority"}
          title={"Priority"}
          value={this.state.newLocation.priority}
          placeholder={"Enter the priority for given location"}
          handleChange={this.handlePriority}
        />{" "}
        {/* Priority information */}
        <TextArea
          title={"Description"}
          rows={10}
          value={this.state.newLocation.about}
          name={"currentLocationInfo"}
          handleChange={this.handleTextArea}
          placeholder={"Description of the new location."}
        />
        {/* About you */}
        <Button
          action={this.handleFormSubmit}
          type={"primary"}
          title={"Submit"}
          style={buttonStyle}
        />{" "}
        {/*Submit */}
        <Button
          action={this.handleClearForm}
          type={"secondary"}
          title={"Clear"}
          style={buttonStyle}
        />{" "}
        {/* Clear the form */}
      </form>
    );
  }
}

const buttonStyle = {
  margin: "10px 10px 10px 10px"
};

export default FormContainer;
