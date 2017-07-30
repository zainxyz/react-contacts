import PropTypes from 'prop-types';
import React from 'react';

const ContactListItem = ({ contact, }) => (
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
    <button className="contact-remove">
      Remove
    </button>
  </li>
);

ContactListItem.propTypes = {
  contact: PropTypes.object,
};

ContactListItem.defaultProps = {
  contact: {},
};

export default ContactListItem;
