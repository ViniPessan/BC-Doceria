import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ItemCarrinho {
  id: number;
  produtoId: number;
  nome: string;
  tipo?: string;
  imagem?: string;
  quantidade: number;
  tamanho?: string;
  massa?: string;
  recheios?: string[];
  cobertura?: string;
  decoracoes?: string[];
  preco: number;
}
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
  },
})

export const { adicionarItem, removerItem, limparCarrinho, atualizarItem } = carrinhoSlice.actions
export default carrinhoSlice.reducer
