import escapeRegExp from 'escape-string-regexp';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';
import sortBy from 'sort-by';

import ContactListItem from './ContactListItem';

class ContactList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.clearQuery = this.clearQuery.bind(this);
  }

  componentWillMount() {
    const { contacts, } = this.props;

    this.setState({
      contacts,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { contacts, } = this.state;

    if (!isEqual(nextProps.contacts, contacts)) {
      this.setState({
        contacts: nextProps.contacts,
      });
    }
  }

  updateQuery(query) {
    this.setState({ query, });
  }

  clearQuery() {
    this.setState({ query: '', });
  }

  renderContactList() {
    const { contacts, query, } = this.state;
    const { onDeleteContact, } = this.props;

    // Make a copy of the state contacts.
    let contactsCopy = [...contacts];

    // If a query param is present, then lets match the param and filter the contacts list.
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      contactsCopy = contactsCopy.filter(contact =>
        match.test(contact.name)
      );
    }

    // Always sort the contactsCopy alphabetically by their name
    contactsCopy = [...contactsCopy.sort(sortBy('name'))];

    return (
      <div>
        <div className="showing-contacts">
          {this.renderShowingContactsText(contactsCopy)}
        </div>
        <ol className="contact-list">
          {contactsCopy.map(contact => (
            <ContactListItem
              key={shortid.generate()}
              contact={contact}
              onDeleteContact={onDeleteContact}
            />
          ))}
        </ol>
      </div>
    );
  }

  renderShowingContactsText(filteredContacts) {
    const { contacts, } = this.state;
    const filteredContactsLength = filteredContacts.length;
    const originalContactsLength = contacts.length;

    if (!isEqual(filteredContactsLength, originalContactsLength)) {
      return (
        <div>
          <span>Now showing {filteredContactsLength} of {originalContactsLength} total</span>
          <button onClick={this.clearQuery}>Show all</button>
        </div>
      );
    }

    return null;
  }

  renderSearchInput() {
    const { query, } = this.state;

    return (
      <input
        className="search-contacts"
        type="text"
        placeholder="Search Contacts..."
        value={query}
        onChange={(e) => this.updateQuery(e.target.value)}
      />
    );
  }

  render() {
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          {this.renderSearchInput()}
        </div>
        {this.renderContactList()}
      </div>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
