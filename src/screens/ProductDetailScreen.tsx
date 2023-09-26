import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { Rating, Loader, Message } from '../components'
import { detailProducts } from '../redux/actions/productAction'
import { DispatchType, RootState } from '../redux/store'

const ProductDetailScreen = () => {
  const dispatch: DispatchType = useDispatch<DispatchType>()

  const navigate = useNavigate()

  const { id } = useParams()

  const productDetails = useSelector((state: RootState) => state.productDetails)

  const [quantity, setQuantity] = useState(1)

  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(detailProducts(parseInt(id as string)))
  }, [dispatch, id])

  const addToCartHandler = useCallback(() => {
    navigate(`/cart/${id}?qty=${quantity}`)
  }, [id, navigate, quantity])

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {' '}
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {product && (
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.title} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.title}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating?.rate || 0}
                      text={`${product.rating?.count || 0} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: ${product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>In Stock</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Select Quantity:</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(parseInt(e.target.value))
                            }
                          >
                            {[0, 1, 2, 3, 4].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn btn-block"
                        type="button"
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default ProductDetailScreen
