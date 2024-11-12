import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/redux/slices/user/userSlice'
import categoryReducer from '@/redux/slices/category/categorySlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userReducer, 
        category : categoryReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']