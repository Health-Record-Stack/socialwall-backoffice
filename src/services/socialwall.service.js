export function fetchSocialwallSeed(limit, skip) {
  return fetch(
    `http://localhost:44556/api/socialwalls?limit=${limit}&skip=${skip}`,
  );
}

export default { fetchSocialwallSeed };
