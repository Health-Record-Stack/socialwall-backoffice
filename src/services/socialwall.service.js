import dotenv from 'dotenv';

dotenv.config();

export const fetchSocialwallSeedServer = (limit, skip) => {
 
  return fetch(
    `${process.env.REACT_APP_API_ENDPOINT}socialwalls?limit=${limit}&skip=${skip}`,
  );
};

export const updateFeedContentOnServer = (content) => {
  const updateContent = content.html
    ? {
      html: content.html,
      createdon: new Date(content.createdon),
    }
    : content;
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}socialwalls/${content.id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateContent),
  });
};

export const deleteFeedOnServer = (id) => fetch(`${process.env.REACT_APP_API_ENDPOINT}socialwalls/${id}`, {
  method: 'delete',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
});
