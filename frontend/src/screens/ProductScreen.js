import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating'
import { useParams,useNavigate , Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Image, Card , Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Detailsproduct , ProductReview } from '../actions/productAction'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'
import {PRODUCT_CREATE_REVIEW_RESET} from '../constents/productConstent'

function ProductScreen() {
    const history = useNavigate()
    const [qty,setQty] =useState(1)
    const [rating,setRating] =useState(0)
    const [comment,setComment] =useState('')
    const  params  = useParams()
    const id = params.id
    const dispatch = useDispatch()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productdetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productdetails
    
    const productReview = useSelector(state=>state.productReview)
    const {loading: loadingReview , error: errorReview , success : successReview } = productReview


    useEffect(() => {
        if(successReview){
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(Detailsproduct(id))
    }, [dispatch,successReview])
    

    const AddToCartHandler = () => {
        history(`/cart/${id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(ProductReview(
            id, {
            rating,
            comment
        }
        ))
    }
    return (

        <div>


            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader /> :
                error
                    ? <Message variant='danger'>Page {error.statusText} with status {error.status} </Message>
                    :
                    (
                    <div>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Price : ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    Description : {product.description}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price :</Col>
                                            <Col><strong>${product.price}</strong></Col>
                                        </Row>

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countinStock > 0 ? 'In Stock' : 'Out Stock' }</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    { product.countinStock > 0 &&
                                        (
                                            <ListGroup.Item>
                                                <Row>
                                                <Col>Quantity</Col>
                                                <Col xs='auto' className='my-1'>
                                                <Form.Control
                                                as="select"
                                                value={qty}
                                                onChange={(e)=>setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.countinStock).keys()].map((x) =>(
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    }
                                    <ListGroup.Item>
                                        <Row>
                                            <Button 
                                            onClick={AddToCartHandler}
                                            className='btn-block' 
                                            type='button' 
                                            disabled={product.countinStock == 0}>
                                                Add To Card
                                                </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review)=>(
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color='#f8e825'/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                 <ListGroup.Item>
                                            <h4>Write a review</h4>

                                            {loadingReview && <Loader />}
                                            {successReview && <Message variant='success'>Review Submitted</Message>}
                                            {errorReview && <Message variant='danger'>{errorReview}</Message>}

                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Rating</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Select...</option>
                                                            <option value='1'>1 - Poor</option>
                                                            <option value='2'>2 - Fair</option>
                                                            <option value='3'>3 - Good</option>
                                                            <option value='4'>4 - Very Good</option>
                                                            <option value='5'>5 - Excellent</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Review</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='5'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>

                                                    <Button
                                                        disabled={loadingReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ) : (
                                                    <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                                )}
                                        </ListGroup.Item>

                            </ListGroup>
                        </Col>
                    </Row>
                    </div>
                    )
            }


        </div>
    )
}

export default ProductScreen