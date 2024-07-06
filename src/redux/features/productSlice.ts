// src/features/products/productsSlice.ts

import { IProduct } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ProductsState {
  products: IProduct[];
  status: boolean;
  priceRange: number;
}

const initialState: ProductsState = {
  products: [],
  status: true,
  priceRange: 100,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    loadProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = [...state.products, ...action.payload];
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  toggleStatus,
  setPriceRange,
  loadProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
