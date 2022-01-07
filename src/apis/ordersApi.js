import axiosClient from 'axios-client';
import { ordersURL } from 'constants/baseURL';
import queryString from 'query-string';

export const ordersApi = {
    getAll(filterParams) {
        const params = queryString.stringify(filterParams);
        const url = `${ordersURL}?${params}`;
        return axiosClient.get(url);
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
