export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID || '',
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN || '',
      SHOPWARE_API_URL: process.env.SHOPWARE_API_URL || '',
      SHOPWARE_ACCESS_TOKEN: process.env.SHOPWARE_ACCESS_TOKEN || '',
    },
  },
});
