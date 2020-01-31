import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router";
import UserRegistrationActions from "../../actions/userRegistration.action";
import UserRegistrationStore from "../../stores/userReg.store";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      regDone : false,
      username: "",
      password: "",
      repeatedPassword: "",
      submitted: false,
      loading: false,
      error: "",
      userData: {
        username: "",
        password: "",
        repeatedPassword: ""
      }
    };

    this.handleUsernameRegister = this.handleUsernameRegister.bind(this);
    this.handlePasswordRegister = this.handlePasswordRegister.bind(this);
    this.handleRepeatedPasswordRegister = this.handleRepeatedPasswordRegister.bind(
      this
    );
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.redirectRegisterUser = this.redirectRegisterUser.bind(this);
    UserRegistrationStore.addChangeListener(
      "REGISTRATION_SUCCESSFUL",
      this.redirectRegisterUser
    );
  }

  redirectRegisterUser() {
    this.setState({regDone : true});
    alert("Registration successful. Please enter the details in the login page to login")
  }

  handleUsernameRegister = e => {
    let username = e.target.value;
    this.setState({ username: username });
    this.setState(
      prevState => ({
        userData: {
          ...prevState.userData,
          username: username
        }
      }),
      () => console.log(this.state.newLocation)
    );
  };

  handlePasswordRegister = e => {
    let password = e.target.value;
    this.setState({ password: password });
    this.setState(
      prevState => ({
        userData: {
          ...prevState.userData,
          password: password
        }
      }),
      () => console.log(this.state.newLocation)
    );
  };

  handleRepeatedPasswordRegister = e => {
    let repeatedPassword = e.target.value;
    this.setState({ repeatedPassword: repeatedPassword });
    this.setState(
      prevState => ({
        userData: {
          ...prevState.userData,
          repeatedPassword: repeatedPassword
        }
      }),
      () => console.log(this.state.newLocation)
    );
  };


  handleFormSubmit(e) {
    let username = this.state.username;
    let password = this.state.password;
    let repeatedPassword = this.state.repeatedPassword;
    if (!username && !password) {
      alert("Enter Username and Password");
    } else if (password !== repeatedPassword) {
      alert("Passwords do not match.");
    } else {
      this.setState({ redirect: true });
    }
  }

  handleRegistration(e) {
    let username = this.state.username;
    let password = this.state.password;
    let repeatedPassword = this.state.repeatedPassword;
    if (!username && !password) {
      alert("Enter Username and Password");
    } else if (password !== repeatedPassword) {
      alert("Passwords do not match.");
    } else {
      e.preventDefault();
    let userRegistrationData = this.state.userData;
    UserRegistrationActions.registrationCheck(userRegistrationData);
    }

  }

  render() {
    if (this.state.regDone) {
      return(
        <Redirect push to="/login"></Redirect>
      );
    }
    return (
      <div className="registration-page-container">
        <div className="registration-form-container">
          <Form className="registration-form">
            <Form.Label className="registration-form-label">Register</Form.Label>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="email-input-line"
                type="email"
                placeholder="Enter email"
                value={this.state.username}
                onChange={this.handleUsernameRegister}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="password-input-line"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordRegister}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="password-input-line"
                type="password"
                placeholder="Repeat password"
                value={this.state.repeatedPasswordpassword}
                onChange={this.handleRepeatedPasswordRegister}
              />
            </Form.Group>

            <Button
              className="create-button"
              variant="outline-light"
              type="submit"
              onClick={this.handleRegistration}
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
