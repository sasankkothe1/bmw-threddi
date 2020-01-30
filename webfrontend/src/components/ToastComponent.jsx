import React, { Component } from "react";
import { Row, Col, Toast } from "react-bootstrap";

class ToastComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        state : false
    }
  }

  render() {
    return (
      <Row>
        <Col xs={6}>
          <Toast
            onClose={() => this.setState({state:false})}
            show={this.props.show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Notification</strong>
              <small>Just Now</small>
            </Toast.Header>
            <Toast.Body>
              {this.props.body}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
}
export default ToastComponent;
