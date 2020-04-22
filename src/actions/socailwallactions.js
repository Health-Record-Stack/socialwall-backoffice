import { fetchSocialwallSeed } from '../services/socialwall.service';

function fetchSocialwallFeedSuccess(feed) {
  return { type: 'SOCIALWALL_FEED_FETCH_SUCCESS', feed };
}

function fetchSocialwallFeedFailed(e) {
  return { type: 'SOCIALWALL_FEED_FETCH_ERROR', error: e };
}

function fetchSocialwallFeed(limit, skip) {
  return (dispatch) => fetchSocialwallSeed(limit, skip)
    .then((response) => {
      response.json().then((feed) => {
        if (feed.status) {
          const data = { limit, skip, feed: feed.data };
          dispatch(fetchSocialwallFeedSuccess(data));
        } else dispatch(fetchSocialwallFeedFailed(feed.message));
      });
    })
    .catch((e) => {
      dispatch(fetchSocialwallFeedFailed(e));
    });
}

export default { fetchSocialwallFeed };
