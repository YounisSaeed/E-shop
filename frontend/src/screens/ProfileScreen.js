import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row ,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails ,UserUpdateProfile} from '../actions/userAction'
import {USER_UPDATE_PROFILE_RESET} from '../constents/userConstant'
import {listMyorders} from '../actions/orderAction'
function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const { location } = useSearchParams()
    const history = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderMyList = useSelector(state=>state.orderMyList)
    const {loading:loadingOrders,error:errorOrders,orders} = orderMyList

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyorders())

            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user , success])



    const submitHandler = (e) => {
        e.preventDefault()
        if (password != ConfirmPassword) {
            setMessage(' password not matched ')
        } else {
            dispatch(UserUpdateProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password,
            }))
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h1>Profile</h1>
                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                            
                            type='name'
                            placeholder='Enter Username'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='ConfirmPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            
                            type='password'
                            placeholder='Enter Confirm Password'
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>

                </Form>
            </Col>
            <Col md={9}>
                <h1> My Orders </h1>
                {loadingOrders?(
                    <Loader/>
                ):errorOrders ?(
                    <Message variant='danger'>{errorOrders}</Message>
                ):(
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delieverd</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) :(
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen