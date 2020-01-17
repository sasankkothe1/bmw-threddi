import React, {Component} from 'react';
import { Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router';
import Auth from '../../services/auth.service';



export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            redirect: false
    };

    this.handleUsernameLogin = this.handleUsernameLogin.bind(this);
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);


    // componentWillMount(){

    // }
  }
  
  handleUsernameLogin = e => {
    let username = e.target.value;
    this.setState({ username : username });
  };

  handlePasswordLogin = e => {
    let password = e.target.value;
    this.setState({ password : password });
  };

  handleFormSubmit(e) {
    let username = this.state.username;
    let password = this.state.password;
    if(!username && !password) {
      alert("Enter Username and Password");
    } else {
      this.setState({redirect: true});
    }
  }

  handleLogin(e) {
    Auth.login(this.state.username, this.state.password).catch(function(err){
      console.log("error during login " + err)
    });
  }

  // handleChange(e) {
  //         const { name, value } = e.target;
  //         this.setState({ [name]: value });
  // }

  // updateEmail(value) {
  //   this.setState({
  //     email: value,
  //   });
  // }


    render () {
      if (this.state.redirect) {
        return <Redirect push to="/" />;
      }
      return (
        <div className="login-page-container">
            <div className="login-form-container">
              <Form className="login-form">
                <Form.Label className="form-label">Log into Threddi</Form.Label>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control className="email-input-line" type="email" placeholder="Enter email" value={this.state.username} onChange={this.handleUsernameLogin} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control className="password-input-line" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordLogin}/>
                </Form.Group>

                  <Button className="login-button" variant="outline-light" type="submit" onClick={this.handleLogin}>
                    Login
                  </Button>
                </Form>
            </div>

            <div className="help-tool-bar-container">
              <Button variant="outline-light">Create account</Button>
              <Button variant="outline-light">Recover account</Button>
              <Button variant="outline-light">Help</Button>
            </div>

          </div>
      )
    }
}
