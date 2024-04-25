import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from '../../store/authslice';

 function LogoutBtn() {
    
const dispathch = useDispatch()
const logoutHandler = () => {
    authService.logout().then(()=>{
      dispathch(logout())
    })
    
}
    return (
    <button className='inline-block px-6 py-2 duration-200 text-neutral-50 hover:bg-gray-400 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
    )
}

export default LogoutBtn;
