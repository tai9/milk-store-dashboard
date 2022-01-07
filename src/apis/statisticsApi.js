import axiosClient from 'axios-client';
import { statisticURL } from 'constants/baseURL';

export const statisticsApi = {
    getTotal() {
        return axiosClient.get(statisticURL);
    },
    getChart() {
        return axiosClient.get(`${statisticURL}/invoices`);
    }
};
