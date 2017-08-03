import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as ContactsAPI from './utils/ContactsAPI';
import ContactList from './ContactList';
import CreateContact from './CreateContact';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };

    this.removeContact = this.removeContact.bind(this);
    this.renderContactList = this.renderContactList.bind(this);
    this.renderCreateContact = this.renderCreateContact.bind(this);
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

  createContact(contact, history) {
    ContactsAPI.create(contact)
      .then(contact => {
        this.setState(state => ({
          contacts: state.contacts.concat([contact]),
        }));
        history.push('/');
      });
  }

  removeContact(contact) {
    this.setState((state) => ({
      contacts: state.contacts.filter(c => c.id !== contact.id),
    }));

    ContactsAPI.remove(contact);
  }

  renderContactList() {
    const { contacts, } = this.state;

    return (
      <ContactList
        contacts={contacts}
        onDeleteContact={this.removeContact}
      />
    );
  }

  renderCreateContact({ history, }) {
    return (
      <CreateContact
        onCreateContact={(contact) => this.createContact(contact, history)}
      />
    );
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={this.renderContactList} />
        <Route path="/create" render={this.renderCreateContact} />
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