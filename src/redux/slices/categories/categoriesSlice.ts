import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categories.AsyncThunk"; // تأكد من المسار الصحيح

interface Category {
    name: string;
}

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload; // بيانات الفئات
                state.error = null;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch categories'; // رسالة الخطأ
            });
    },
});

export default categorySlice.reducer;
