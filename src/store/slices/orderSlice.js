import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    pagination: {
        page: 1,
        limit: 10
    }
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        fetchOrderList: (state, action) => {
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
        }
    }
});

// Action creators are generated for each case reducer function
export const { fetchOrderList } = ordersSlice.actions;

// Selector
export const selectOrderList = (state) => state.orders;

const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
