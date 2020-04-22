/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socailwallactions from '../actions/socailwallactions';

const Home = ({
  currentLimit, currentSkip, feed, fetchFeed,
}) => {
  useEffect(() => {
    fetchFeed(currentLimit, currentSkip);
  }, [currentLimit, currentSkip]);

  return (
    <div>
      <h1>test Home</h1>
      {feed.map((f) => (
        <div>{f.type}</div>
      ))}
    </div>
  );
};

Home.propTypes = {
  currentLimit: PropTypes.number.isRequired,
  currentSkip: PropTypes.number.isRequired,
  fetchFeed: PropTypes.func.isRequired,
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

const getPageFeed = (socialwall) => {
  const currentPageFeed = socialwall.socialFeed.filter(
    (sf) => sf.limit === socialwall.currentLimit && sf.skip === socialwall.currentSkip,
  );
  return currentPageFeed
    && currentPageFeed.length > 0
    && currentPageFeed[0].feed
    ? currentPageFeed[0].feed
    : [];
};

const mapStateToProps = (state) => ({
  currentLimit: state.socialwall.currentLimit,
  currentSkip: state.socialwall.currentSkip,
  feed: getPageFeed(state.socialwall),
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeed: (currentLimit, currentSkip) => dispatch(socailwallactions.fetchSocialwallFeed(currentLimit, currentSkip)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
