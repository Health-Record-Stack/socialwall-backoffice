/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */

const socialwall = (
  state = {
    currentLimit: 10,
    currentSkip: 0,
    socialFeed: [],
  },
  action,
) => {
  const updateFeed = (updatedFeed) => {
    const newState = {
      ...state,
      socialFeed: state.socialFeed.map((sf) => {
        if (state.currentSkip !== sf.skip) {
          return sf;
        }

        return {
          ...sf,
          feed: sf.feed.map((feed) => {
            if (feed._id === updatedFeed._id) {
              return { ...feed, ...updatedFeed };
            }

            return feed;
          }),
        };
      }),
    };
    return newState;
  };

  const deleteFeed = (id) => {
    const newState = {
      ...state,
      socialFeed: state.socialFeed.map((sf) => {
        if (state.currentSkip !== sf.skip) {
          return sf;
        }

        return {
          ...sf,
          feed: sf.feed.filter((feed) => {
            if (feed._id !== id) {
              return { ...feed };
            }
          }),
        };
      }),
    };

    return newState;
  };

  switch (action.type) {
    case 'SOCIALWALL_FEED_FETCH_SUCCESS':
      return { ...state, socialFeed: [...state.socialFeed, action.feed] };
    case 'SOCIALWALL_FEED_FETCH_ERROR':
      return action.error;
    case 'SOCIALWALL_FEED_UPDATE_SUCCESS':
      return updateFeed(action.updatedFeed);
    case 'SOCIALWALL_FEED_UPDATE_FAILED':
      return action.error;
    case 'SOCIALWALL_FEED_DELETE_SUCCESS':
      return deleteFeed(action.id);
    case 'SOCIALWALL_FEED_DELETE_FAILED':
      return action.error;
    default:
      return state;
  }
};

export default socialwall;
