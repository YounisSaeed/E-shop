import React, {useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { useDispatch, useSelector } from 'react-redux'
import { Listproduct } from '../actions/productAction'

function HomeScreen() {
  const dispatch = useDispatch()
  const productlist = useSelector(state => state.productList)

  const { loading , products ,error} = productlist
  useEffect(() => {
    dispatch(Listproduct())
  }, [dispatch])
  return (
    <div>
      <h1>Latest Products</h1>
      { loading ? <Loader/>
      : error ? <Message variant='danger'>{error.statusText} Request failed with status  {error.status}</Message> 
      :<Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />

            </Col>
          ))}
        </Row>
      }

    </div>
  )
}

export default HomeScreen