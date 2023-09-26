import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header, Footer } from './components'
import {
  HomeScreen,
  AllProductsScreen,
  CartScreen,
  ProductDetailScreen,
} from './screens'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/all-products" element={<AllProductsScreen />} />
              <Route path="/product/:id" element={<ProductDetailScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
