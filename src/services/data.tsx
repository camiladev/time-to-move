const URL_BACKEND_TOP = 
    // window.location.hostname.includes('localhost')
    // ? 'http://localhost:8080' : 'https://static-job-listings.herokuapp.com';
    window.location.hostname.includes('localhost') && 'http://localhost:8080';

export default {
  URL_BACKEND_TOP,
};