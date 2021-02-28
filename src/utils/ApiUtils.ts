export function getApiUrl(endpoint: string, params?: any) {
  let query = '';
  if (params) {
    Object.keys(params).forEach((key) => {
      query = `${query}${query ? '&' : '?'}${key}=${params[key]}`;
    });
  }
  return `http://localhost:3001${endpoint}${query}`;
}
