import { Dispatch } from 'redux'
import {
  CART_ADD_ITEM,
  CART_CHECKOUT_ITEMS,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'
import { AppActions, RootState } from '../store'
import api from '../../utils/api'
import { Product } from '../reducers/productReducers'

export type CartItem = {
  product: Product
  qty: number
}

export const addToCart =
  (id: number, qty: number) =>
  async (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
    const { data } = await api.get<Product>(`/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data,
        qty,
      },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const removeFromCart =
  (id: number) =>
  (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const checkoutCart =
  () => (dispatch: Dispatch<AppActions>, getState: () => RootState) => {
    dispatch({
      type: CART_CHECKOUT_ITEMS,
      payload: undefined,
    })

    localStorage.setItem('cartItems', JSON.stringify([]))
  }
