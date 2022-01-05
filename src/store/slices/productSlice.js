import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    pagination: {
        page: 1,
        limit: 10
    }
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductList: (state, action) => {
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
        }
    }
});

// Action creators are generated for each case reducer function
export const { fetchProductList } = productsSlice.actions;

// Selector
export const selectProductList = (state) => state.products;

const productsReducer = productsSlice.reducer;
export default productsReducer;
