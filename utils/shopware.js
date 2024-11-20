import axios from 'axios';

console.log('Shopware API URL:', process.env.SHOPWARE_API_URL);
console.log('Shopware Access Token:', process.env.SHOPWARE_ACCESS_TOKEN);

const shopwareClient = axios.create({
  baseURL: process.env.SHOPWARE_API_URL, // Shopware API URL
  headers: {
    Authorization: `Bearer ${process.env.SHOPWARE_ACCESS_TOKEN}`, // Shopware API token
  },
});

export const fetchShopwareSettings = async () => {
  try {
    const response = await shopwareClient.get('/settings'); // endpoint
    console.log('Fetched Shopware Settings:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error Fetching Shopware Data:', err.message);
    throw err;
  }
};
