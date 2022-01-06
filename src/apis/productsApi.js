import axiosClient from 'axios-client';
import { productsURL } from 'constants/baseURL';
import queryString from 'query-string';

export const productsApi = {
    getAll(filterParams) {
        const params = queryString.stringify(filterParams);
        const url = `${productsURL}?${params}`;
        return axiosClient.get(url);
    }
};
