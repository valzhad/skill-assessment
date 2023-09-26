import { CartItem } from '../actions/cartActions'
import {
  CART_ADD_ITEM,
  CART_CHECKOUT_ITEMS,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants'

export interface CartState {
  cartItems: CartItem[]
}

export interface CartAction {
  type:
    | typeof CART_ADD_ITEM
    | typeof CART_REMOVE_ITEM
    | typeof CART_CHECKOUT_ITEMS
  payload: CartItem | number | undefined
}

const INITIAL_STATE: CartState = {
  cartItems: [],
}

export const cartReducer = (
  state = INITIAL_STATE,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload as CartItem
      const existItem = state.cartItems.find(
        (x) => x.product.id === item.product.id
      )
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product.id === existItem.product.id ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.product.id !== action.payload
        ),
      }
    case CART_CHECKOUT_ITEMS:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}
