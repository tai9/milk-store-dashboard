import axiosClient from 'axios-client';
import { productsURL } from 'constants/baseURL';

export const productsApi = {
    getAll() {
        return axiosClient.get(productsURL);
    }
};
