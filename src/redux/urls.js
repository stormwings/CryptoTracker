const baseUrl = 'localhost:8000';

const coinGecko = 'https://api.coingecko.com/api/v3/';

export const urlFavorites = `${baseUrl}/favorites`;

export const urlCryptoPriceChart = (crypto) =>
  `${coinGecko}coins/${crypto}/market_chart?vs_currency=usd&days=5&interval=daily`;
