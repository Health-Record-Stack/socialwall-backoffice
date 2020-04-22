const socialwall = (
  state = {
    currentLimit: 10,
    currentSkip: 0,
    socialFeed: [],
  },
  action,
) => {
  switch (action.type) {
    case 'SOCIALWALL_FEED_FETCH_SUCCESS':
      return { ...state, socialFeed: [...state.socialFeed, action.feed] };
    case 'SOCIALWALL_FEED_FETCH_ERROR':
      return action.e;
    default:
      return state;
  }
};

export default socialwall;
