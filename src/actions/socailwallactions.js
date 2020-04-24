import {
  fetchSocialwallSeedServer,
  updateFeedContentOnServer,
} from '../services/socialwall.service';

function fetchSocialwallFeedSuccess(feed) {
  return { type: 'SOCIALWALL_FEED_FETCH_SUCCESS', feed };
}

function fetchSocialwallFeedFailed(e) {
  return { type: 'SOCIALWALL_FEED_FETCH_ERROR', error: e };
}

function fetchSocialwallFeed(limit, skip) {
  return (dispatch) => fetchSocialwallSeedServer(limit, skip)
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

function updateFeedContentSuccess(updatedFeed) {
  return { type: 'SOCIALWALL_FEED_UPDATE_SUCCESS', updatedFeed };
}

function updateFeedContentFailed(error) {
  return { type: 'SOCIALWALL_FEED_UPDATE_FAILED', error };
}

function updateFeedContent(content) {
  return (dispatch) => updateFeedContentOnServer(content)
    .then((response) => {
      response.json().then((responsedata) => {
        if (responsedata.status) dispatch(updateFeedContentSuccess(responsedata.data));
        else updateFeedContentFailed(responsedata.message);
      });
    })
    .catch((e) => {
      updateFeedContentFailed(e);
    });
}

export default { fetchSocialwallFeed, updateFeedContent };
