import { createClient } from 'contentful';

console.log('Contentful Space ID:', process.env.CONTENTFUL_SPACE_ID);
console.log('Contentful Access Token:', process.env.CONTENTFUL_ACCESS_TOKEN);

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, // Space ID from environment
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Access token from environment
  host: 'preview.contentful.com', // Use Preview API
});

export const fetchBannerData = async () => {
  try {
    const response = await contentfulClient.getEntries({ content_type: 'banner' });
    console.log('Fetched Contentful Data:', response.items);

    return response.items.map(item => ({
      image: item.fields.bannerImage.fields.file.url, // Banner image URL
      link: item.fields.linkUrl,                      // Banner link
      start: item.fields.startScheduling,             // Scheduling start
      end: item.fields.endScheduling,                 // Scheduling end
    }));
  } catch (err) {
    console.error('Error Fetching Contentful Data:', err.message);
    throw err;
  }
};
