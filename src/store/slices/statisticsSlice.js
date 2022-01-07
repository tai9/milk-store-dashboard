import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalEarning: 0,
    totalOrder: 0,
    totalPayment: 0,
    series: []
};

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        fetchTotalPaymentOrders: (state, action) => {
            state.totalEarning = action.payload.totalEarning;
            state.totalOrder = action.payload.totalOrder;
        },
        fetchTotalChartOrders: (state, action) => {
            state.totalPayment = action.payload.totalPayment;
            state.series = action.payload.series;
        }
    }
});

// Action creators are generated for each case reducer function
export const { fetchTotalPaymentOrders } = statisticsSlice.actions;
export const { fetchTotalChartOrders } = statisticsSlice.actions;

// Selector
export const selectStatistics = (state) => state.statistics;

const statisticsReducer = statisticsSlice.reducer;
export default statisticsReducer;
