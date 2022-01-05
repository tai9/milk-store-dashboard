import axiosClient from 'axios-client';
import { productsURL } from 'constants/baseURL';

export const productsApi = {
    getAll(filter) {
        return axiosClient.get(productsURL);
    }
};
