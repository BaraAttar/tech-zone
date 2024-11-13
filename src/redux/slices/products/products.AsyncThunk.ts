import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

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

const getProducts = createAsyncThunk<Products, void, { rejectValue: string }>(
    'products/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            const reponse = await axios.get(`${apiUrl}/products`)
            return reponse.data
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.message || 'Failed to fetch products');
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }

    }

)

export { getProducts }