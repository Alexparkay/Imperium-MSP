// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://react-admin-ui-v1-api.vercel.app';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  TOP_DEALS: `${API_BASE_URL}/topdeals`,
  TOTAL_USERS: `${API_BASE_URL}/totalusers`,
  TOTAL_PRODUCTS: `${API_BASE_URL}/totalproducts`,
  TOTAL_RATIO: `${API_BASE_URL}/totalratio`,
  TOTAL_REVENUE: `${API_BASE_URL}/totalrevenue`,
  TOTAL_SOURCE: `${API_BASE_URL}/totalsource`,
  TOTAL_VISIT: `${API_BASE_URL}/totalvisit`,
  TOTAL_REVENUE_BY_PRODUCTS: `${API_BASE_URL}/totalrevenue-by-product`,
  TOTAL_PROFIT: `${API_BASE_URL}/totalprofit`,
  USERS: `${API_BASE_URL}/users`,
  PRODUCTS: `${API_BASE_URL}/products`,
  ORDERS: `${API_BASE_URL}/orders`,
  POSTS: `${API_BASE_URL}/posts`,
  NOTES: `${API_BASE_URL}/notes`,
  LOGS: `${API_BASE_URL}/logs`,
} as const;

export default API_ENDPOINTS; 