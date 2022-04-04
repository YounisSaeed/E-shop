import React ,{useEffect,useState} from 'react'
import {Form,Button,Col,Row} from 'react-bootstrap'
import {Link,useNavigate,useLocation,useSearchParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {Register} from '../actions/userAction'

function RegisterScreen() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [ConfirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()

    const {location} = useSearchParams()
    const  history = useNavigate()
    const redirect = location ? location.split('=')[1]:'/'
    
    const userRegister = useSelector(state=>state.userRegister)
    const {error,loading,userInfo} = userRegister

    useEffect(()=>
    {
        if (userInfo){
            history(redirect)
        }
    },[history,userInfo,redirect])



  const submitHandler = (e) =>{
      e.preventDefault()
      if (password != ConfirmPassword){
          setMessage(' password not matched ')
      }else{
      dispatch(Register(name,email,password))
    }
  }
  return (
    <FormContainer>
        <h1> Register </h1>
        {message && <Message>{message}</Message>}
        {error && <Message>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>UserName</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Username'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='ConfirmPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Confirm Password'
                    value={ConfirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            
            <Button type='submit' variant='primary'>Register</Button>
            
        </Form>
        <Row className='py-3'>
            <Col>
                Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen