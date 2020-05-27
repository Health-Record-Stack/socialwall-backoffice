/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import script from "scriptjs";

import socailwallactions from "../actions/socailwallactions";

import SocialwallUpdateItem from "../components/socialwallupdateitem";

const SocialwallUpdate = ({
  currentLimit,
  currentSkip,
  totalPages,
  feed,
  fetchFeed,
  updateFeedContent,
  handleDelete,
}) => {
  const [twitterScriptLoaded, setTwitterScriptLoaded] = useState(false);

  useEffect(() => {
    fetchFeed(currentLimit, currentSkip);
  }, [currentLimit, currentSkip, fetchFeed]);

  useEffect(() => {
    debugger;
    if (feed && feed.length > 0) {
      if (!twitterScriptLoaded) {
        const twitterScript = "https://platform.twitter.com/widgets.js";

        script(twitterScript, "twitter-embed", () => {
          setTwitterScriptLoaded(true);
        });
      }

      if (twitterScriptLoaded) window.twttr.widgets.load();
    }
  }, [feed]);

  const handleSubmit = (socialwallUpdate) => {
    updateFeedContent(socialwallUpdate);
  };

  return (
    <>
      <h1>Update Socialwall</h1>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link">Previous</a>
          </li>

          {[...Array(totalPages).keys()].map((n) => (
            <li className="page-item">
              <a
                className="page-link"
                onClick={() => {fetchFeed(currentLimit, n * currentLimit)}}
              >
                {n + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
      <div className="d-flex flex-column">
        {feed.map((f) => (
          <SocialwallUpdateItem
            key={f._id}
            feed={f}
            handleSubmit={handleSubmit}
            handleDeleteFeed={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

SocialwallUpdate.propTypes = {
  currentLimit: PropTypes.number.isRequired,
  currentSkip: PropTypes.number.isRequired,
  fetchFeed: PropTypes.func.isRequired,
  updateFeedContent: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      createdon: PropTypes.string,
      _id: PropTypes.string,
      type: PropTypes.string,
      html: PropTypes.string,
      links: PropTypes.object,
    })
  ).isRequired,
};

const getPageFeed = (socialwall) => {
  debugger;
  const currentPageFeed = socialwall.socialFeed.filter(
    (sf) =>
      sf.limit === socialwall.currentLimit && sf.skip === socialwall.currentSkip
  );
  return currentPageFeed &&
    currentPageFeed.length > 0 &&
    currentPageFeed[0].feed
    ? currentPageFeed[0].feed
    : [];
};

const mapStateToProps = (state) => ({
  currentLimit: state.socialwall.currentLimit,
  currentSkip: state.socialwall.currentSkip,
  totalPages: state.socialwall.totalPages,
  feed: getPageFeed(state.socialwall),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeed: (cl, cs) =>
    dispatch(socailwallactions.fetchSocialwallFeed(cl, cs)),
  updateFeedContent: (content) =>
    dispatch(socailwallactions.updateFeedContent(content)),
  handleDelete: (id) => dispatch(socailwallactions.handleDelete(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialwallUpdate);
