import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./products.AsyncThunk";

interface Product {
    category: string
    cost: number
    createdAt: string
    description: string
    image: string
    name: string
    price: number
    __v: number
    _id: string
}

interface Products {
    pagination: {
        currentPage: number
        limit: number
        totalPages: number
        totalProducts: number
    }
    products: Product[]
}

interface ProductsState {
    products : Products
    loading: boolean;
    error: string | null;
}

const initialState : ProductsState = {
    products: {
        pagination: {
            currentPage: 1,
            limit: 10,
            totalPages: 0,
            totalProducts: 0,
        },
        products: [],
    },
    loading : false,
    error: null,
}

const productsSlice = createSlice({
name : "products",
initialState,
reducers : {},

extraReducers : (builder) => {
    builder
    .addCase(getProducts.pending , (state)=>{
        state.loading = true
    })
    .addCase(getProducts.fulfilled , (state , action)=>{
        state.loading = false
        state.products = action.payload
    })
    .addCase(getProducts.rejected , (state , action)=>{
        state.loading = false
        state.error = action.payload || 'Failed to fetch products';
    })
}
})

export default productsSlice.reducer;
