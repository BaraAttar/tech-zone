import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/slices/user/userSlice'
import categoryReducer from '@/redux/slices/categories/categoriesSlice'
import productsReducer from '@/redux/slices/products/productsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userReducer, 
        category : categoryReducer,
        product : productsReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']