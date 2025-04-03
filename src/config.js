// Debug environment variables
console.log('NODE_ENV:', process.env.NODE_ENV);

// Set API URL based on environment
const isProduction = process.env.NODE_ENV === 'production';
console.log('Is Production:', isProduction);

export const API_URL = isProduction 
  ? 'https://outsider-express-f8ef1ffa744f.herokuapp.com' 
  : 'http://localhost:3000'; 
