import axios from 'axios';
import cookies from 'js-cookie';
import checkExpiredToken from 'utils/check-expired-token';

const token = cookies.get('token');
const headers = {
    'content-type': 'application/json',
    authorization: `Bearer ${token}`
};

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        // Do something before request is sent

        if (!token) {
            const authToken = cookies.get('token');
            config.headers = {
                authorization: `Bearer ${authToken}`
            };
        }

        const isExpired = checkExpiredToken(token);

        if (!isExpired) return config;

        cookies.remove('token');
        // window.location.replace('/');

        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosClient;
