const isProduction = process.env.NODE_ENV === 'production';

export const BASE_URL = isProduction
  ? 'https://backend-portfolio-jha4.vercel.app/'
  : 'http://localhost:5000';

export const API = {
  portfolio: `${BASE_URL}/api/portfolio`,
  contact: `${BASE_URL}/api/contact`,
};