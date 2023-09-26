import React, { useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { DispatchType, RootState } from '../redux/store'
import {
  addToCart,
  removeFromCart,
  checkoutCart,
} from '../redux/actions/cartActions'
import SuccessModal from '../components/SuccessModal'

const CartScreen: React.FC<{}> = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch: DispatchType = useDispatch<DispatchType>()
  const cart = useSelector((state: RootState) => state.cart)

  const [showModal, setShowModal] = React.useState(false)

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(parseInt(id), qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(parseInt(id)))
  }

  const checkOutHandler = () => {
    dispatch(checkoutCart())
    setShowModal(true)
  }

  const handleClose = useCallback(() => {
    setShowModal(false)
    navigate('/')
  }, [])

  return (
    <Row>
      <SuccessModal show={showModal} handleClose={handleClose} />
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flust">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product.id}`}>
                      {item.product.title}
                    </Link>
                  </Col>
                  <Col md={2}>{item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product.id, Number(e.target.value))
                        )
                      }
                    >
                      {[0, 1, 2, 3, 4].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        removeFromCartHandler(
                          item.product.id.toString() as string
                        )
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){' '}
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
