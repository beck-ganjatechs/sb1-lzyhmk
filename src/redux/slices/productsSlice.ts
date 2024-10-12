import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  strainName: string;
  batchDate: string;
  totalGrams: number;
  type: 'Indica' | 'Sativa' | 'Hybrid';
  notes: string;
  pungency: number;
  totalCannabinoids: number;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;