import React, { useEffect, useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Detailsproduct , ProductUpdate } from '../actions/productAction'
import {PRODUCT_UPDATE_RESET} from '../constents/productConstent'
import axios from 'axios'
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
    const [uploading, setUploading] = useState(false)
    

    const dispatch = useDispatch()

    const history = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = productUpdate

    
    useEffect(() => {

        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history('/admin/productlist')
        }else{
            if (!product.name || product._id !== Number(productId)) {
                dispatch(Detailsproduct(productId))

            } else {
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countinStock)
                setDescription(product.description)
                setImage(product.image)
            }
        }
        
            
    }, [ dispatch,productId , product  , history , successUpdate ])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(ProductUpdate({
            _id:productId,
            name,
            price,
            brand,
            category,
            countinStock,
            description,
            image,
        }))

    }

    const uploadfileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        formData.append('product_id',productId)
        setUploading(true)
        try{
            const config = {
                headers:{
                    'Content-type':'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/products/upload/',formData,config)
            setImage(data)
            setUploading(false)
        }catch(error){
            setUploading(false)
        }
    }
    return (
        <div>
            <Link to='/admin/productlist/'>
                GO Back
            </Link>
            <FormContainer>
                <h1> Edit product </h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
                            <Form.Control
                            type='file'
                            
                            label='Choice Image'
                            
                            onChange={uploadfileHandler}
                            >

                            </Form.Control>
                        </Form.Group>
                        
                        
                        
                        <Button type='submit' variant='primary'>Update</Button>

                    </Form>
                )}


            </FormContainer>
        </div>

    )
}

export default ProductEditScreen