<template>
    <div>
      <div v-if="shouldDisplayBanner" class="banner">
        <a :href="currentBanner.link" target="_blank">
          <img :src="currentBanner.image" alt="Banner Image" />
        </a>
      </div>
      <p v-else>No active banners to display.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { fetchBannerData } from '~/utils/contentful';
  import { fetchShopwareSettings } from '~/utils/shopware';
  
  const banners = ref([]);
  const shopwareSettings = ref({});
  const currentBannerIndex = ref(0);
  
  // Filter banners based on scheduling
  const activeBanners = computed(() => {
    const now = new Date();
    return banners.value.filter(
      banner =>
        new Date(banner.start) <= now && new Date(banner.end) >= now
    );
  });
  
  // Determine the current banner to display
  const currentBanner = computed(() => activeBanners.value[currentBannerIndex.value]);
  
  // Determine if any banners should be displayed
  const shouldDisplayBanner = computed(() => activeBanners.value.length > 0);
  
  onMounted(async () => {
    try {
      banners.value = await fetchBannerData(); // Fetch data from Contentful
      console.log('Banners:', banners.value);
  
      shopwareSettings.value = await fetchShopwareSettings(); // Fetch settings from Shopware
      console.log('Shopware Settings:', shopwareSettings.value);
  
      // Rotate banners if enabled in Shopware settings
      if (shopwareSettings.value.rotate && activeBanners.value.length > 1) {
        setInterval(() => {
          currentBannerIndex.value =
            (currentBannerIndex.value + 1) % activeBanners.value.length;
        }, shopwareSettings.value.timer || 5000); // Default rotation: 5000ms
      }
    } catch (err) {
      console.error('Error Initializing Banners:', err.message);
    }
  });
  </script>
  
  <style scoped>
  .banner img {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: cover;
  }
  </style>
  