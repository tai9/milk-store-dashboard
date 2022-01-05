import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// ==============================|| REDUX - MAIN STORE ||============================== //

export const store = configureStore({
    reducer: rootReducer
});
