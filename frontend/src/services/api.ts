import axios from 'axios';
import { config } from '@/config';

interface JobResponse {
  hits: {
    hits: Array<{
      _source: JobSource;
    }>;
  };
}

interface JobSource {
  job_title: string;
  job_description: string;
  is_remote: boolean;
  job_location: string;
  company_name: string;
  posted_date: string;
  job_id: number;
  total_hits: number;
  url: string;
}

const api = axios.create({
  baseURL: `${config.API_URL}${config.API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': window.location.origin,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  withCredentials: false
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
// api.interceptors.response.use(
//   (response) => {
//     console.log('Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('Response Error:', error);
//     return Promise.reject(error);
//   }
// );

export interface SearchFilters {
  searchQuery: string;
  salaryRange: [number, number];
  selectedLocations: string[];
  selectedJobTypes: string[];
}

interface ApiJobSource {
  job_title: string;
  job_description: string;
  is_remote: boolean;
  job_location: string;
  company_name: string;
  posted_date: string;
  job_id: number;
  total_hits: number;
  url: string;
}

interface ApiJobHit {
  _score: number;
  _source: ApiJobSource;
}

interface ApiResponse {
  hits: {
    total: {
      value: number;
      relation: string;
    };
    hits: ApiJobHit[];
  };
}

export interface Job {
  job_title: string;
  job_description: string;
  is_remote: boolean;
  id?: number;
  company?: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  type?: string;
  remote?: string;
  posted_date?: string;
  logo?: string;
  total_hits?: number;
  url?: string;
}

export const searchJobs = async (filters: SearchFilters): Promise<Job[]> => {
  try {
    const response = await api.post<ApiResponse>('/search', {
      query: filters.searchQuery || "",
      salary_min: filters.salaryRange[0],
      salary_max: filters.salaryRange[1],
      locations: filters.selectedLocations,
      job_types: filters.selectedJobTypes
    });
    console.log('Raw API response:', response.data);
    
    const totalHits = response.data.hits.total.value;
    
    // Mapujemy odpowiedź z API i dodajemy mockowe dane
    return (response.data.hits.hits || []).map((hit, index) => ({
      job_title: hit._source.job_title,
      job_description: hit._source.job_description,
      is_remote: hit._source.is_remote,
      id: hit._source.job_id,
      company: hit._source.company_name,
      location: hit._source.job_location,
      salary_min: 8000 + (index * 1000),
      salary_max: 12000 + (index * 1000),
      type: 'Pełny etat',
      remote: hit._source.is_remote ? 'Zdalnie' : 'W biurze',
      posted_date: hit._source.posted_date,
      logo: ['🚀', '💡', '🎨', '☁️'][index % 4],
      total_hits: totalHits,
      url: hit._source.url
    }));
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

export const jobsApi = {
  getJobDetails: async (jobId: string): Promise<JobResponse> => {
    const response = await api.post<JobResponse>(`/job_detail?job_id=${parseInt(jobId, 10)}`, {});
    return response.data;
  },
  
  getJobs: async () => {
    const response = await api.get('/jobs');
    return response.data;
  }
};

export type { JobSource, JobResponse };
export default api;
