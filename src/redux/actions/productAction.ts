import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'
import api from '../../utils/api'
import { ThunkAction } from 'redux-thunk'
import { DispatchType, RootState } from '../store'
import { AppActions } from '../reducers/productReducers'

export const listProducts =
  (): ThunkAction<void, RootState, unknown, AppActions> =>
  async (dispatch: DispatchType) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const { data } = await api.get('/products')
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const detailProducts =
  (id: number) => async (dispatch: DispatchType) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST })
      const { data } = await api.get(`/products/${id}`)
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
