import React ,{useEffect,useState} from 'react'
import {Button,Col,Row,ListGroup,Image,Card} from 'react-bootstrap'
import {Link,useNavigate,useLocation,useSearchParams, useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getDetailOrder,getPayOrder,getDeliverOrder} from  '../actions/orderAction'
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from '../constents/orderConstant'
function OrderScreen() {
    
  const match = useParams()
  const orderId = match.id
  const history = useNavigate()
  const  [sdkReady,setSdkReady] = useState(false)

  const orderDetail = useSelector(state => state.orderDetail)
  const {order,error,loading} =orderDetail

  const orderPay = useSelector(state => state.orderPay)
  const {loading:loadingPay,success:successPay} =orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const {loading:loadingDeliver,success:successDeliver} =orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const addPayPalScript = () =>{
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATo8ow_Yb7i93BfL_w8ZZa9Tg-1KcCO91eswfhdKlzYAoRzq03e9b-2Spq9P2inYWT_1YC0zvFpc00Mo'
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  const dispatch = useDispatch()
  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty , 0).toFixed(2)
  }

  useEffect(()=>{
      if(!userInfo){
        history('/login')
      }
      if(!order ||successPay || order._id !==Number(orderId) || successDeliver ){
        dispatch({type:ORDER_PAY_RESET})
        dispatch({type:ORDER_DELIVER_RESET})
        dispatch(getDetailOrder(orderId))
      }else if(!order.isPaid){
        if(!window.paypal){
          addPayPalScript()
        }else{
          setSdkReady(true)
        }
      }
    
  },[dispatch,order,orderId,successPay,successDeliver])

  const successPaymentHandler = (paymentresult) =>{
    dispatch(getPayOrder(orderId,paymentresult))
  }

  const successDeliverHandler = () => {
    dispatch(getDeliverOrder(order))
  }
  
  return loading ?
  (
  <Loader />
  ):error?(
    <Message variant='danger'>{error}</Message>
  ):(
    <div>    
    <h1>Order: {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p> 
              <strong>Shipping: </strong>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong><a href={order.user.email}>{order.user.email}</a></p>
              {order.shippingAddress.address},{order.shippingAddress.city}
              {' '}
              {order.shippingAddress.postalcode}
              {' '}
              {order.shippingAddress.country}

            </p>
            {order.isDelivered ? (
              <Message variant='success'>isDelivered on {order.deliveredAt.substring(0,10)}</Message>
            ):(
              <Message variant='warning'>Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message>
            ):(
              <Message variant='warning'>Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Item</h2>
            {order.orderItems.length === 0 ? <Message variant='info'>
              Order Is Empty
            </Message>:(
                <ListGroup.Item variant='flush'>
                    {order.orderItems.map((item,index)=>(
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
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader/>}
                    {!sdkReady?(
                      <Loader/>
                    ):(
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
            </ListGroup>
            {loadingDeliver && <Loader/>}
            
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                type='button'
                className='btn btn-block'
                onClick={successDeliverHandler}
                >
                  Mark As Deliver
                </Button>
              </ListGroup.Item>
            )}
        </Card>
      </Col>
    </Row>
    </div>
  )
}

export default OrderScreen