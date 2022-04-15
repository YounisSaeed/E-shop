import React, {useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Listproduct } from '../actions/productAction'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCarousol from '../components/ProductCarousol'

function HomeScreen() {
  const dispatch = useDispatch()
  const history = useNavigate()
  const location = useLocation()
  const productlist = useSelector(state => state.productList)
  let keyword = location.search
  
  const { loading , products ,error , page , pages} = productlist
  useEffect(() => {
    dispatch(Listproduct(keyword))
  }, [dispatch,keyword])
  return (
    <div>
      {!keyword && <ProductCarousol/>}
      <h1>Latest Products</h1>
      { loading ? <Loader/>
      : error ? <Message variant='danger'>{error.statusText} Request failed with status  {error.status}</Message> 
      :
      <div>
      <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />

            </Col>
          ))}
        </Row>
          <Paginate page={page} pages={pages} keyword={keyword}/>
        </div>
      }

    </div>
  )
}

export default HomeScreen