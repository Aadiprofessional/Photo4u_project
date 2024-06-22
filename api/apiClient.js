import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_KEY = '6f102c62f41998d151e5a1b48713cf13';

const apiClient = axios.create({
  baseURL: 'https://api.flickr.com/services/rest/',
  params: {
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: 1,
    extras: 'url_s',
  },
});

axiosRetry(apiClient, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

export default apiClient;
