import React, { useEffect, useState } from 'react'
import { Table, Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Listproduct,ProductCreate ,ProductDelete} from '../actions/productAction'
import { PRODUCT_CREATE_RESET} from '../constents/productConstent'
function ProductListScreen() {
    const history = useNavigate()
    const match = useParams()
    const dispatch = useDispatch()
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate,success:successCreate, product:Created_product } = productCreate
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDeleteProduct,error:errorDeleteProduct,success:SuccessDeleteProduct} = productDelete



    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin) {
            history('/login')
        }
        if(successCreate){
            history(`/admin/product/${Created_product._id}/edit`)
        }else{
            dispatch(Listproduct())
        }

    }, [dispatch, history, userInfo,SuccessDeleteProduct,successCreate,Created_product])

    const deleteHandler = (id) => {
        if (window.confirm(' Are You Sure To Delete This Product ')) {
            dispatch(ProductDelete(id))

        }
    }

    const createProductHandler = () => {
        dispatch(ProductCreate())
    }
    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>

                </Col>
            </Row>
            { loadingDeleteProduct && <Loader/>}
            { errorDeleteProduct && <Message variant='danger'>{errorDeleteProduct}</Message>}

            { loadingCreate && <Loader/>}
            { errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? (<Loader />) :
                error ? (<Message variant='danger'>{error}</Message>) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>name</th>
                                <th>price</th>
                                <th>count</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.countinStock}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button
                                                variant='light'
                                                className='btn-sm'
                                            >
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

        </div>

    )
}

export default ProductListScreen