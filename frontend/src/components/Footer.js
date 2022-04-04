import { Container,Row,Col } from 'react-bootstrap'
import React from 'react'

function Footer() {
  return (
    <div>
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyrigh &copy; E-shop</Col>
                </Row>
            </Container>
        </footer>
    </div>
  )
}

export default Footer