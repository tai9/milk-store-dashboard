import { combineReducers } from 'redux';
import productsReducer from 'store/slices/productSlice';
import ordersReducer from 'store/slices/orderSlice';
import statisticsReducer from 'store/slices/statisticsSlice';

// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    products: productsReducer,
    orders: ordersReducer,
    statistics: statisticsReducer
});

export default reducer;
