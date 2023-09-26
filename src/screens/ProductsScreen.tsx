import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../redux/store' // Ensure you import RootState from your store

import { listProducts } from '../redux/actions/productAction'
import { ProductList } from '../components'

function ProductsScreen() {
  const dispatch: DispatchType = useDispatch<DispatchType>()

  const productList = useSelector((state: RootState) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <ProductList
      heading="Latest Products"
      loading={loading}
      error={error}
      products={products}
    />
  )
}

export default ProductsScreen
