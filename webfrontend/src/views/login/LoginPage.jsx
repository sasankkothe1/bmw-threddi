import React, {Component} from 'react';
import { Button} from "react-bootstrap";
import Form from 'react-bootstrap/Form'


export default class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  updateEmail(value) {
    this.setState({
      email: value,
    });
  }

    render () {
      return (
        <div className="login-page-container">
            <div className="login-form-container">
              <Form className="login-form">
                <Form.Label className="form-label">Log into Threddi</Form.Label>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control className="email-input-line" type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control className="password-input-line" type="password" placeholder="Password" />
                </Form.Group>

                  <Button className="login-button" variant="outline-light" type="submit">
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
