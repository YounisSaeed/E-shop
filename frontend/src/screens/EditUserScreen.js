import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, UsersUpdate } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constents/userConstant'
function EditUserScreen() {
    const match = useParams()
    const userId = match.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const history = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history('/admin/users')
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))

            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }

        }
    }, [ userId , user , successUpdate , history ])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(UsersUpdate({
            _id:user._id,
            name,email,isAdmin
        }))

    }
    return (
        <div>
            <Link to='/admin/users/'>
                GO Back
            </Link>
            <FormContainer>
                <h1> Edit User </h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> : (
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
                        <Form.Group controlId='isadmin'>

                            <Form.Check

                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>Update</Button>

                    </Form>
                )}


            </FormContainer>
        </div>

    )
}

export default EditUserScreen