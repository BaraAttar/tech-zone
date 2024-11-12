import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_KEY;

interface Category {
    name: string;
}

const getCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
    'category/getCategories', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/category`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                // إذا كانت هناك مشكلة في الـ axios، أعد الخطأ باستخدام rejectWithValue
                return rejectWithValue(error.message || 'Failed to fetch categories');
            } else {
                return rejectWithValue('An unknown error occurred');
            }
        }
    }
);

export { getCategories };
