import axiosClient from 'axios-client';
import { loginURL } from 'constants/baseURL';

export const authApi = {
    login(data) {
        return axiosClient.post(loginURL, data);
    }
};
