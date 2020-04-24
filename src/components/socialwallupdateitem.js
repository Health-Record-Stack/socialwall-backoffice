/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faEyeSlash,
  faEye,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import SocialwallItem from './socialwallitem';
import SocialwallItemEdit from './socialwallitemedit';

const SocialwallUpdateItem = ({ feed, handleSubmit, handleDeleteFeed }) => {
  const [socialwallUpdate, setSocialwallUpdate] = useState(false);
  const [socialwallUpdateData, setSocialwallUpdateData] = useState({});
  const handleEnabelEdit = (feedVal) => {
    setSocialwallUpdate(!socialwallUpdate);
    setSocialwallUpdateData({
      html: feedVal.html,
      createdon: feed.createdon,
      id: feedVal._id,
    });
  };
  const handleHTMLUpdate = (html) => {
    setSocialwallUpdateData({ ...socialwallUpdateData, html });
  };

  const handleVisibility = (hide) => {
    if (hide && !feed.ishidden) {
      handleSubmit({ id: feed._id, ishidden: true });
    } else if (feed.ishidden) {
      handleSubmit({ id: feed._id, ishidden: false });
    }
  };

  const handleTimeUpdate = (createdon) => {
    setSocialwallUpdateData({ ...socialwallUpdateData, createdon });
  };
  const handleSubmitEvent = () => {
    handleSubmit(socialwallUpdateData);
  };

  const handleDelete = (id) => {
    handleDeleteFeed(id);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <span>{feed.type}</span>
        <ul className="list-inline float-right my-0 py-1 pr-3">
          <li className="list-inline-item">
            <button
              type="button"
              onClick={() => {
                handleEnabelEdit(feed);
              }}
            >
              <FontAwesomeIcon icon={faEdit} title="Edit" color="brown" />
            </button>
          </li>
          <li className="list-inline-item">
            {!feed.ishidden ? (
              <button
                type="button"
                onClick={() => {
                  handleVisibility(true);
                }}
              >
                <FontAwesomeIcon icon={faEyeSlash} title="Hide" color="green" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleVisibility(false);
                }}
              >
                <FontAwesomeIcon icon={faEye} title="Show" color="green" />
              </button>
            )}
          </li>
          <li className="list-inline-item">
            <button
              type="button"
              onClick={() => {
                handleDelete(feed._id);
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} color="red" />
            </button>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <SocialwallItem item={feed} />
        {socialwallUpdate && (
          <SocialwallItemEdit
            item={socialwallUpdateData}
            handleHTMLUpdate={handleHTMLUpdate}
            handleSubmit={handleSubmitEvent}
            handleTimeUpdate={handleTimeUpdate}
          />
        )}
      </div>
      <div className="card-footer text-muted">
        {moment(feed.createdon).format('MMMM Do YYYY, h:mm:ss a')}
      </div>
    </div>
  );
};

SocialwallUpdateItem.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteFeed: PropTypes.func.isRequired,
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      createdon: PropTypes.string,
      _id: PropTypes.string,
      type: PropTypes.string,
      html: PropTypes.string,
      links: PropTypes.object,
    }),
  ).isRequired,
};

export default SocialwallUpdateItem;
