import React ,{useEffect,useState} from 'react'
import {Form,Button,Col,Row} from 'react-bootstrap'
import {Link,useNavigate,useLocation,useSearchParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {SavePaymentMethod} from '../actions/cartActions'

function PaymentScreen() {

    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()
    const history = useNavigate()

    const [paymentMethod,setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        history('/shipping')

    }

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(SavePaymentMethod(paymentMethod))
        history('/placeorder')
    }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e)=>setPaymentMethod(e.target.value)}

                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen