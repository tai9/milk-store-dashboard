import axiosClient from 'axios-client';
import { productsURL } from 'constants/baseURL';
import queryString from 'query-string';

export const productsApi = {
    getAll(filterParams) {
        const params = queryString.stringify(filterParams);
        const url = `${productsURL}?${params}`;
        return axiosClient.get(url);
    },
    add(data) {
        return axiosClient.post(productsURL, data);
    },
    update(id, data) {
        return axiosClient.patch(`${productsURL}/${id}`, data);
    }
};
