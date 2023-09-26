import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import {
  productListReducer,
  productDetailReducer,
  ProductListActions,
  ProductDetailActions,
  ProductListState,
  ProductDetailState,
} from './reducers/productReducers'
import { cartReducer, CartAction, CartState } from './reducers/cartReducers' // import the cartReducer and its types

export type RootState = {
  productList: ProductListState
  productDetails: ProductDetailState
  cart: CartState
}

export type DispatchType = ThunkDispatch<RootState, unknown, AppActions>

export type AppActions = ProductListActions | ProductDetailActions | CartAction

const reducer = combineReducers<RootState>({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
})

const initialState = {}

const middleware = [thunk as ThunkMiddleware<RootState, AppActions>]

const store: Store<RootState, AppActions> & {
  dispatch: any
} = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store
