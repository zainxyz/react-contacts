import PropTypes from 'prop-types';
import React from 'react';

const ContactListItem = ({ contact, onDeleteContact, }) => (
  <li className="contact-list-item">
    <div
      className="contact-avatar"
      style={{
        backgroundImage: `url(${contact.avatarURL})`,
      }}
    />
    <div className="contact-details">
      <p>{contact.name}</p>
      <p>{contact.email}</p>
    </div>
    <button
      className="contact-remove"
      onClick={() => onDeleteContact(contact)}
    >
      Remove
    </button>
  </li>
);

ContactListItem.propTypes = {
  contact: PropTypes.object,
  onDeleteContact: PropTypes.func,
};

ContactListItem.defaultProps = {
  contact: {},
  onDeleteContact: () => {},
};

export default ContactListItem;
