import React ,{useEffect,useState} from 'react'
import {Button,Col,Row,ListGroup,Image,Card} from 'react-bootstrap'
import {Link,useNavigate,useLocation,useSearchParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CheckOutSteps from '../components/CheckOutSteps'


function PlaceOrderScreen() {
  return (
    <CheckOutSteps step1 step2 step3 step4/>
  )
}

export default PlaceOrderScreen