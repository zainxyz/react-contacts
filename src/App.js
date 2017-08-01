import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as ContactsAPI from './utils/ContactsAPI';
import ContactList from './ContactList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };

    this.removeContact = this.removeContact.bind(this);
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then(contacts => this.setState({ contacts, }));
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

    ContactsAPI.remove(contact);
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
  contacts: [],
};

export default App;
