import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ContactList from './ContactList';

class App extends Component {
  constructor(props) {
    super(props);

    this.removeContact = this.removeContact.bind(this);
  }
  componentWillMount() {
    const { contacts, } = this.props;

    this.setState({
      contacts,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { contacts, } = this.props;

    if (!isEqual(contacts, nextProps.contacts)) {
      this.setState({
        contacts: nextProps.contacts,
      });
    }
  }

  removeContact(contact) {
    this.setState((state) => ({
      contacts: state.contacts.filter(c => c.id !== contact.id),
    }));
  }

  render() {
    const { contacts, } = this.state;

    return (
      <div>
        <ContactList
          contacts={contacts}
          onDeleteContact={this.removeContact}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.array,
};

App.defaultProps = {
  contacts: [
    {
      "id": "ryan",
      "name": "Ryan Florence",
      "email": "ryan@reacttraining.com",
      "avatarURL": "http://localhost:5001/ryan.jpg",
    },
    {
      "id": "michael",
      "name": "Michael Jackson",
      "email": "michael@reacttraining.com",
      "avatarURL": "http://localhost:5001/michael.jpg",
    },
    {
      "id": "tyler",
      "name": "Tyler McGinnis",
      "email": "tyler@reacttraining.com",
      "avatarURL": "http://localhost:5001/tyler.jpg",
    }
  ],
};

export default App;
