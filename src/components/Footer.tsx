import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#f8f9fa',
        marginTop: 'auto',
      }}
    >
      <Container className="py-2">
        <Row>
          <Col xs={12}>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </Col>
          <Col xs={12}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </Col>
          <Col className="text-center py-3">
            Copyright &copy; E-Commerce Assessment
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
