import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating'
import { useParams,useNavigate , Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Image, Card , Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Detailsproduct } from '../actions/productAction'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'

function ProductScreen() {
    const history = useNavigate()
    const [qty,setQty] =useState(1)
    const  params  = useParams()
    const id = params.id
    const dispatch = useDispatch()
    const productdetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productdetails
    useEffect(() => {
        dispatch(Detailsproduct(id))
    }, [dispatch])
    

    const AddToCartHandler = () => {
        history(`/cart/${id}?qty=${qty}`)
    }

    return (

        <div>


            <Link to='/' className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader /> :
                error
                    ? <Message variant='danger'>Page {error.statusText} with status {error.status} </Message>
                    :
                    (<Row>
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
                                            disabled={product.countInStock == 0}>
                                                Add To Card
                                                </Button>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)
            }


        </div>
    )
}

export default ProductScreen