import axiosClient from 'axios-client';
import { ordersURL } from 'constants/baseURL';

export const ordersApi = {
    getAll() {
        return axiosClient.get(ordersURL);
    },
    getById(id) {
        return axiosClient.get(`${ordersURL}/${id}`);
    },
    update(id, data) {
        return axiosClient.put(`${ordersURL}/${id}`, data);
    },
    add(data) {
        return axiosClient.post(ordersURL, data);
    }
};
