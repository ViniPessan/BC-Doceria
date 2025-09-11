import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ItemCarrinho } from '../../types/produto'


interface CarrinhoState {
  itens: ItemCarrinho[]
}

const initialState: CarrinhoState = {
  itens: [],
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarItem: (state, action: PayloadAction<ItemCarrinho>) => {
      state.itens.push(action.payload)
    },
    removerItem: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(item => item.id !== action.payload)
    },
    limparCarrinho: (state) => {
      state.itens = []
    },
    atualizarItem: (state, action: PayloadAction<ItemCarrinho>) => {
      const index = state.itens.findIndex(i => i.id === action.payload.id)
      if (index >= 0) {
        state.itens[index] = action.payload
      }
    },
    aumentarQuantidade: (state, action: PayloadAction<number>) => {
      const item = state.itens.find(i => i.id === action.payload)
      if (item) {
        item.quantidade += 1
      }
    },
    diminuirQuantidade: (state, action: PayloadAction<number>) => {
      const item = state.itens.find(i => i.id === action.payload)
      if (item && item.quantidade > 1) {
        item.quantidade -= 1
      }
    },
  },
})

export const { 
  adicionarItem, 
  removerItem, 
  limparCarrinho, 
  atualizarItem,
  aumentarQuantidade,
  diminuirQuantidade
} = carrinhoSlice.actions

export default carrinhoSlice.reducer