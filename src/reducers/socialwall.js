/* eslint-disable no-underscore-dangle */
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

  switch (action.type) {
    case 'SOCIALWALL_FEED_FETCH_SUCCESS':
      return { ...state, socialFeed: [...state.socialFeed, action.feed] };
    case 'SOCIALWALL_FEED_FETCH_ERROR':
      return action.e;
    case 'SOCIALWALL_FEED_UPDATE_SUCCESS':
      return updateFeed(action.updatedFeed);
    case 'SOCIALWALL_FEED_UPDATE_FAILED':
      return action.e;
    default:
      return state;
  }
};

export default socialwall;
