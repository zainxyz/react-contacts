import PropTypes from 'prop-types';
import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { Link } from 'react-router-dom';

import ImageInput from './ImageInput';

class CreateContact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const { onCreateContact, } = this.props;

    e.preventDefault();
    const values = serializeForm(e.target, { hash: true, });
    if (
      onCreateContact &&
      typeof onCreateContact === 'function'
    ) {
      onCreateContact(values);
    }
  }

  render() {
    return (
      <div>
        <Link
          className="close-create-contact"
          to="/"
        >
          Close
        </Link>
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="Email" />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

CreateContact.propTypes = {
  onCreateContact: PropTypes.func,
};

CreateContact.defaultProps = {
  onCreateContact: null,
};

export default CreateContact;