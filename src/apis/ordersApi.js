import axiosClient from 'axios-client';
import { ordersURL } from 'constants/baseURL';

export const ordersApi = {
    getAll(filter) {
        return axiosClient.get(ordersURL);
    },
    getById(id) {
        return axiosClient.get(`${ordersURL}/${id}`);
    }
};
