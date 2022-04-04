import React ,{useEffect}from 'react'
import {Link, useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart ,RemoveFromCart } from '../actions/cartActions'


function CartScreen() {
  
  const  params  = useParams()
  const producId = params.id
  const  history  = useNavigate()
  const {location} = useLocation()
  //const [searchParams] = useSearchParams()
  const qty = location ? Number(location.split("=")[1]):1;
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  
  
  const RemoveFromCartHandler = (id) => {
    dispatch(RemoveFromCart(id))
  }

  const CheckOutHandler = () =>{
    history('/shipping')
  }

  useEffect(()=> {
    if(producId)
    {
      dispatch(addToCart(producId,qty))
    }
  },[dispatch,producId,qty])
  return (
    <Row>
      <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ?(
            <Message variant='info'>
              Your Cart is Empty <Link to='/'>Go Back</Link>
            </Message>
          ):(
            <ListGroup variant='flush'>
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        ${item.price}
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}
                        > 
                        {[...Array(item.countinStock).keys()].map(
                          (x) => (
                            <option key={x+1} value={x+1}>
                                {x+1}
                            </option>
                          )
                        )
                        }

                        </Form.Control>
                        </Col>
                        <Col md={1}>
                          <Button type='button' onClick={()=>RemoveFromCartHandler(item.product)} variant='light'>
                            <i className='fas fa-trash'></i>
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
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Total ITEMS({cartItems.reduce((acc,item)=>acc + item.qty,0)})</h2>
                ${cartItems.reduce((acc,item)=>acc + item.qty * item.price,0).toFixed()}

              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                <Button
                type='button'
                className=' block'
                disabled={cartItems.length===0}
                onClick={CheckOutHandler}
                >
                  Proceed To Checkout
                </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          
      </Col>
    </Row>
  )
}

export default CartScreen