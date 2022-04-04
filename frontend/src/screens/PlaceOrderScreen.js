import React ,{useEffect,useState} from 'react'
import {Button,Col,Row,ListGroup,Image,Card} from 'react-bootstrap'
import {Link,useNavigate,useLocation,useSearchParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'


function PlaceOrderScreen() {
  const cart = useSelector(state => state.cart)
  cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty , 0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice > 200 ? 0 : 10).toFixed(2)
  cart.taxPrice = Number((0.5)*cart.itemsPrice).toFixed(2)
  cart.totalPrice = Number(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
  const placeOrder = () =>{
    console.log(' place Order ')
  }
  return (
    <div>    
    <CheckOutSteps step1 step2 step3 step4 />
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Shipping: </strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city}
              {' '}
              {cart.shippingAddress.postalcode}
              {' '}
              {cart.shippingAddress.country}

            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment</h2>
            <p>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Item</h2>
            {cart.cartItems.length === 0 ? <Message variant='info'>
              Your Cart Is Empty
            </Message>:(
                <ListGroup.Item variant='flush'>
                    {cart.cartItems.map((item,index)=>(
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}> 
                            <Image src={item.image} alt={item.name} fluid rounded/>
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup.Item>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Item:</Col>
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
              type='button'
              className='btn-block'
              disabled={cart.cartItems === 0}
              onClick={placeOrder}
              >
                      Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </div>
  )
}

export default PlaceOrderScreen