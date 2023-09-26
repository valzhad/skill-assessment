import React, { FC, memo } from 'react'
import { Col, Row } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import Product from './Product'
import { Product as ProductType } from '../redux/reducers/productReducers'

interface ProductListProps {
  heading: string
  loading: boolean
  error?: any
  products: ProductType[]
}

const ProductList: FC<ProductListProps> = ({
  heading,
  loading,
  error,
  products,
}) => {
  return (
    <>
      <h1 className="my-4">{heading}</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default memo(ProductList)
