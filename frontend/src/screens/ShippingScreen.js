import React ,{useEffect,useState} from 'react'
import {Form,Button,Col,Row} from 'react-bootstrap'
import {Link,useNavigate,useLocation,useSearchParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {SaveShippingAddress} from '../actions/cartActions'


function ShippingScreen() {
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalcode,setPostalcode] = useState(shippingAddress.postalcode)
    const [country,setCountry] = useState(shippingAddress.country)
    const history = useNavigate()
    const dispatch =useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(SaveShippingAddress({address,city,postalcode,country}))
        history('/payment')
    }

  return (
    <FormContainer>
        <h1>Shipping Address</h1>
        <CheckOutSteps step1 step2/>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='Address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='address'
                    placeholder='Enter Address'
                    value={address?address:''}
                    onChange={(e)=> setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='city'
                    placeholder='Enter Your City'
                    value={city?city:''}
                    onChange={(e)=> setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalcode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    required
                    type='postalcode'
                    placeholder='Enter PostalCode'
                    value={postalcode?postalcode:''}
                    onChange={(e)=> setPostalcode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='counrty'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='country'
                    placeholder='Enter Your Country'
                    value={country?country:''}
                    onChange={(e)=> setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>
            
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>

  )
}

export default ShippingScreen