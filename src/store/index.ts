import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './slices/carrinhoSlice'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
  },
})

// Tipagens para facilitar o uso do useSelector e useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
