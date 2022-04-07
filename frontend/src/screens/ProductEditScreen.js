import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Detailsproduct } from '../actions/productAction'

function ProductEditScreen() {
    const match = useParams()
    const productId = match.id
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countinStock, setCountInStock] = useState('')
    

    const dispatch = useDispatch()

    const history = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    
    useEffect(() => {
        
            if (!product.name || product._id !== Number(productId)) {
                dispatch(Detailsproduct(productId))

            } else {
                setName(product.name)
                setBrand(product.brand)
                setCategory(product.category)
                setImage(product.image)
                setCountInStock(product.countinStock)
                setDescription(product.description)
                setPrice(product.price)
                
            }
    }, [ dispatch,productId , product  , history ])



    const submitHandler = (e) => {
        e.preventDefault()
        

    }
    return (
        <div>
            <Link to='/admin/productlist/'>
                GO Back
            </Link>
            <FormContainer>
                <h1> Edit product </h1>
                {loading ? <Loader /> : error ? <Message variant={'danger'}>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>name product:</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter product name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>price</Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>brand</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='CountInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control

                                type='number'
                                placeholder='Enter count product'
                                value={countinStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control

                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control

                                type='name'
                                placeholder='Enter product name'
                                value={image}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        
                        
                        
                        <Button type='submit' variant='primary'>Update</Button>

                    </Form>
                )}


            </FormContainer>
        </div>

    )
}

export default ProductEditScreen