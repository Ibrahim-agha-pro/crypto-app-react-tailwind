export const fetchCoins = async () => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  return await response.json();
};

export const fetchCoinDetails = async (id) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  return await response.json();
};

export const fetchChartData = async (id) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
  );

  return await response.json();
};
