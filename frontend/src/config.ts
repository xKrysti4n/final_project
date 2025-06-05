export const config = {
  API_URL: 'http://localhost:8000',
  API_BASE_PATH: '/api/v1'
} as const;

export const getApiUrl = (path: string) => `${config.API_URL}${config.API_BASE_PATH}${path}`; 
