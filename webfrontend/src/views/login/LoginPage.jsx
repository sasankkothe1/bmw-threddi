import React, {Component} from 'react';
import { Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router';
import UserLoginActions from '../../actions/userLogin.actions';
import UserStore from '../../stores/user.store';


export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect : false,
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: '',
            redirect: false,
            userData: {
              username : "",
              password : "",
            }
    };

    this.handleUsernameLogin = this.handleUsernameLogin.bind(this);
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.redirectLoginUser = this.redirectLoginUser.bind(this);
    UserStore.addChangeListener("LOGIN_SUCCESSFUL", this.redirectLoginUser);

  }

  redirectLoginUser(){
    this.setState({redirect : true});
  }

  handleUsernameLogin = e => {
    let username = e.target.value;
    this.setState({ username : username });
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

  handlePasswordLogin = e => {
    let password = e.target.value;
    this.setState({ password : password });
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

  handleFormSubmit(e) {
    let username = this.state.username;
    let password = this.state.password;
    if(!username && !password) {
      alert("Enter Username and Password");
    } else {
      this.setState({redirect: true});
    }
  }
  handleLogin(e){
    e.preventDefault();
    let userLoginData = this.state.userData;
    UserLoginActions.loginCheck(userLoginData);
  }

    render () {
      if (this.state.redirect) {
        return <Redirect push to="/" />;
      }
      return (
        <div className="login-page-container">
            <div className="login-form-container">
              <Form className="login-form">
                <Form.Label className="login-form-label">Log into Threddi</Form.Label>
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
              <Button className="button-create-account" variant="outline-light" onClick={()=>this.forwardTo('/register')}>Create account</Button>



              <Button className="button-recover-account" variant="outline-light">Recover account</Button>
              <Button className="button-help" variant="outline-light">Help</Button>
            </div>

          </div>
      )
    }

    getActiveRouteElement(path){
        return path===this.props.location.pathname?"active-route":""
    }

    forwardTo(route){
        this.props.history.push(route)
    }
  }
