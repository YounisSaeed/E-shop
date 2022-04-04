import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Navbar,Nav,Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userAction'
function Header() {
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        dispatch(logout())
    }
  return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>E-shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                <LinkContainer to='/cart'>
                    <Nav.Link><i className='fas fa-shopping-cart'>Cart</i></Nav.Link>
                </LinkContainer>
                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer onClick={logoutHandler} to='/login'>
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    
                ):(
                    <LinkContainer to='/login'>
                    <Nav.Link ><i className='fas fa-user'>Login</i></Nav.Link>
                    </LinkContainer>
                
                )}</Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
  )
}

export default Header