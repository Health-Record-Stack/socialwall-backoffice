export const fetchSocialwallSeedServer = (limit, skip) => fetch(
  `http://localhost:44556/api/socialwalls?limit=${limit}&skip=${skip}`,
);

export const updateFeedContentOnServer = (content) => {
  const updateContent = content.html
    ? {
      html: content.html,
      createdon: new Date(content.createdon),
    }
    : content;
  return fetch(`http://localhost:44556/api/socialwalls/${content.id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateContent),
  });
};

export const deleteFeedOnServer = (id) => fetch(`http://localhost:44556/api/socialwalls/${id}`, {
  method: 'delete',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
});
