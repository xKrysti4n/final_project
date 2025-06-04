import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export interface SearchFilters {
  searchQuery: string;
  salaryRange: [number, number];
  selectedLocations: string[];
  selectedJobTypes: string[];
}

export const searchJobs = async (filters: SearchFilters) => {
  try {
    // Always send the request, even if searchQuery is empty
    const response = await api.post('/basic_search', {
      query: filters.searchQuery || "",  // Use empty string if no query
      salary_min: filters.salaryRange[0],
      salary_max: filters.salaryRange[1],
      locations: filters.selectedLocations,
      job_types: filters.selectedJobTypes
    });
    return response.data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

export const searchWithAI = async (query: string) => {
  try {
    const response = await api.post('/search-ai', {
      query
    });
    return response.data;
  } catch (error) {
    console.error('Error with AI search:', error);
    throw error;
  }
};
