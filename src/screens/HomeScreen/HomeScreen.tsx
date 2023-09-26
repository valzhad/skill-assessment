import React, { useEffect } from 'react'
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../../components'
import { listProducts } from '../../redux/actions/productAction'
import { DispatchType, RootState } from '../../redux/store'
import styles from './HomeScreen.module.scss'
import { Product as ProductType } from '../../redux/reducers/productReducers'

const HomePage = () => {
  const dispatch: DispatchType = useDispatch<DispatchType>()

  const productList = useSelector((state: RootState) => state.productList)

  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const groupByTwo = (array: ProductType[]) => {
    var result = []
    for (var i = 0; i < array.length; i += 2) {
      result.push(array.slice(i, i + 2))
    }
    return result
  }

  const productGroups = groupByTwo(products)

  return (
    <Container fluid className="my-2">
      <div className={styles.banner}>
        <div className={styles.overlay}></div>
        <Row
          className="justify-content-center text-center text-white"
          style={{ position: 'relative' }}
        >
          <Col xs={12} sm={10} md={8} lg={6}>
            <h1 className="text-white">Welcome to E-commerce Assessment!</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
              quisquam quo voluptatum ducimus praesentium expedita ea, natus
              deserunt nesciunt sunt eius est facilis tenetur reiciendis fugit
              beatae numquam. Quo, ullam!
            </p>
          </Col>
        </Row>
      </div>
      <h2 className="my-4">Our Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Carousel indicators>
          {productGroups.slice(0, 3).map((group, index) => (
            <Carousel.Item key={index}>
              <Row>
                {group.map((product) => (
                  <Col key={product.id}>
                    <Product product={product} width={200} height={500} />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <Row className="my-4">
        <Col md={6}>
          <Image src="https://picsum.photos/1000/768" fluid />
        </Col>
        <Col className="text-center" md={6}>
          <h2>Who We Are</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
