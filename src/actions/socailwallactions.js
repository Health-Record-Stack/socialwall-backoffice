import {
  fetchSocialwallSeedServer,
  updateFeedContentOnServer,
  deleteFeedOnServer,
} from '../services/socialwall.service';

function fetchSocialwallFeedSuccess(feed) {
  return { type: 'SOCIALWALL_FEED_FETCH_SUCCESS', feed };
}

function fetchSocialwallFeedFailed(error) {
  return { type: 'SOCIALWALL_FEED_FETCH_ERROR', error };
}

function fetchSocialwallFeed(limit, skip) {
  return (dispatch) => fetchSocialwallSeedServer(limit, skip)
    .then((response) => {
      response.json().then((feed) => {
        if (feed.status) {
          const data = {
            limit,
            skip,
            total: Math.floor(feed.data.total / limit),
            feed: feed.data.socialwallitems,
          };
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
        else dispatch(updateFeedContentFailed(responsedata.message));
      });
    })
    .catch((e) => {
      updateFeedContentFailed(e);
    });
}

function deleteFeedSuccess(id) {
  return { type: 'SOCIALWALL_FEED_DELETE_SUCCESS', id };
}

function deleteFeedFailed(error) {
  return { type: 'SOCIALWALL_FEED_DELETE_FAILED', error };
}

function handleDelete(id) {
  return (dispatch) => deleteFeedOnServer(id)
    .then((response) => {
      response.json().then((responsedata) => {
        if (responsedata.status && responsedata.data > 0) dispatch(deleteFeedSuccess(id));
        else dispatch(deleteFeedFailed(responsedata.message));
      });
    })
    .catch((e) => {
      deleteFeedFailed(e);
    });
}

export default { fetchSocialwallFeed, updateFeedContent, handleDelete };
