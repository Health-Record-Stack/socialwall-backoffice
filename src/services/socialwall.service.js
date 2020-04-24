export function fetchSocialwallSeedServer(limit, skip) {
  return fetch(
    `http://localhost:44556/api/socialwalls?limit=${limit}&skip=${skip}`,
  );
}

export function updateFeedContentOnServer(content) {
  const updateContent = content.html ? {
    html: content.html,
    createdon: new Date(content.createdon),
  } : content;
  return fetch(`http://localhost:44556/api/socialwalls/${content.id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateContent),
  });
}

export default { fetchSocialwallSeedServer, updateFeedContentOnServer };
