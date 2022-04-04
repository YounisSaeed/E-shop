import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import {BrowserRouter, Router, Route , Routes} from 'react-router-dom'

function App() {
  return (
    <div>
        
        <Header />
        <main className='py-5'>
          <Container>
            <Routes>
              
              <Route path="/" element={<HomeScreen />} exact/>
              <Route path="/login" element={<LoginScreen />}/>
              <Route path="/register" element={<RegisterScreen />}/>
              <Route path="/profile" element={<ProfileScreen />}/>
              <Route path="/shipping" element={<ShippingScreen />}/> 
              <Route path="/payment" element={<PaymentScreen />}/>
              <Route path="/placeorder" element={<PlaceOrderScreen />}/>             
              <Route path="product/:id" element={<ProductScreen />}/>
                <Route path="cart/" element={<CartScreen />}>
                      <Route path=":id" element={<CartScreen />}/>
                </Route>
              
              </Routes>
          </Container>
        </main>
        <Footer />
        </div>
  );
}

export default App;
