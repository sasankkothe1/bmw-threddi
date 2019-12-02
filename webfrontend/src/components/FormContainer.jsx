import React, {Component} from 'react';

/* Import Components */
import CheckBox from './components/CheckBox';
import Input from './components/Input';
import TextArea from './components/TextArea';
import Select from './components/Select';
import Button from './components/Button'

class FormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        location_id: '',
        lat: '',
        long: '',
        description: '',
        priority: '',
        type: ''
      },

      typeOptions: ['Production facility', 'Exhibition location', 'Others']

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  /* This life cycle hook gets executed when the component mounts */
  handleFullName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          name: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleAge(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          age: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        newUser: {
          ...prevState.newUser,
          [name]: value
        }
      }),
      () => console.log(this.state.newUser)
    );
  }

  handleFormSubmit() {
    // Form submission logic
  }
  handleClearForm() {
    // Logic for resetting the form
  }
  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>

        <Input /> {/* Name of the user */}
        <Input /> {/* Input for Age */}
        <Select /> {/* Gender Selection */}
        <CheckBox /> {/* List of Skills (eg. Programmer, developer) */}
        <TextArea /> {/* About you */}
        <Button /> { /*Submit */ }
        <Button /> {/* Clear the form */}
      </form>
    );
  }
}

export default FormContainer;
}
