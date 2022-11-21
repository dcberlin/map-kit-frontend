const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const URLS = {
  COMMUNITIES: `${API_URL}/api/communities/`,
  COMMUNITIES_ADMIN: `${API_URL}/api/communities-admin/`,
  LOCATIONS: `${API_URL}/api/locations/`,
  LOCATIONS_ADMIN: `${API_URL}/api/locations-admin/`,
  USER: `${API_URL}/api/user/`,
};
