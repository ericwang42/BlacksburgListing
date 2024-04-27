import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Adjust this URL based on your environment
});

// Set up request interceptor
api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        // Handle 401 errors
        // Possibly redirect to login or logout the user
        console.log('Unauthorized, logging out...');
        localStorage.removeItem('jwtToken'); // if you want to force logout
        window.location.href = '/login'; // redirect to login page
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
});

export default api;
