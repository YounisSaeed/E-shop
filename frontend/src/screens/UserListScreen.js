import React ,{useEffect,useState} from 'react'
import {Table,Button, Tab} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate,useLocation,useSearchParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {UsersList,UsersDelete} from '../actions/userAction'
function UserListScreen() {
    const history = useNavigate()
    const dispatch = useDispatch()
    const userList = useSelector(state=>state.userList)
    const {loading,error,users} = userList
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userDelete = useSelector(state=>state.userDelete)
    const {success:successDeleted}=userDelete
    
    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(UsersList())
        }else{
            history('/login')
        }

    },[dispatch,history,successDeleted,userInfo])

    const deleteHandler = (id) =>{
         if(window.confirm(' Are You Sure To Delete This User ')){
             dispatch(UsersDelete(id))
            }
    }
  return (
    <div>
        <h1>Users</h1>
        {loading?(<Loader/>):
            error?(<Message variant='danger'>{error}</Message>):(
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>email</th>
                        <th>isAdmin</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? ( <i className='fas fa-check' style={{color:'green'}}></i>)
                            :(<i className='fas fa-check' style={{color:'red'}}></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit/`}>
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
                                        onClick={()=>deleteHandler(user._id)}
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

export default UserListScreen