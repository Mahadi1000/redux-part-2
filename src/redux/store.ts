import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productSlice from './features/productSlice';
import commentSlice from './features/commentSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productSlice,
    comments: commentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
