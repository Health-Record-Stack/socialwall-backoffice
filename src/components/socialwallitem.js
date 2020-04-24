/* eslint-disable react/no-danger */
import React from 'react';
import decode from 'decode-html';
import PropTypes from 'prop-types';

const SocialwallItem = ({ item }) => (
  <div>
    <div
      className="content"
      dangerouslySetInnerHTML={{
        __html: decode(item.html),
      }}
    />
  </div>
);

SocialwallItem.propTypes = {
  item: PropTypes.shape({
    createdon: PropTypes.string,
    _id: PropTypes.string,
    type: PropTypes.string,
    html: PropTypes.string,
    links: PropTypes.object,
  }).isRequired,
};

export default SocialwallItem;
