import PropTypes from 'prop-types';
import React, { Component } from 'react';
import shortid from 'shortid';

import ContactListItem from './ContactListItem';

class ContactList extends Component {
  renderContactListItems() {
    if (Array.isArray(this.props.contacts)) {
      return this.props.contacts.map(contact => (
        <ContactListItem
          key={shortid.generate()}
          contact={contact}
          onDeleteContact={this.props.onDeleteContact}
        />
      ));
    }
    return null;
  }

  render() {
    return (
      <ol className='contact-list'>
        {this.renderContactListItems()}
      </ol>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

ContactList.defaultProps = {
  contacts: [],
  onDeleteContact: () => {},
};

export default ContactList;
