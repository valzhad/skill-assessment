import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'

export interface Rating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export interface ProductListState {
  loading: boolean
  products: Product[]
  error?: any
}

export interface ProductDetailState {
  loading: boolean
  product?: Product
  error?: any
}

export type ProductListActions =
  | { type: typeof PRODUCT_LIST_REQUEST }
  | { type: typeof PRODUCT_LIST_SUCCESS; payload: Product[] }
  | { type: typeof PRODUCT_LIST_FAIL; payload: any }

export type ProductDetailActions =
  | { type: typeof PRODUCT_DETAILS_REQUEST }
  | { type: typeof PRODUCT_DETAILS_SUCCESS; payload: Product }
  | { type: typeof PRODUCT_DETAILS_FAIL; payload: any }

export type AppActions = ProductListActions | ProductDetailActions

export const productListReducer = (
  state: ProductListState = { loading: false, products: [] },
  action: ProductListActions
): ProductListState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload || [] }
    case PRODUCT_LIST_FAIL:
      return { loading: false, products: [], error: action.payload }
    default:
      return state
  }
}

export const productDetailReducer = (
  state: ProductDetailState = { loading: false },
  action: ProductDetailActions
): ProductDetailState => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
