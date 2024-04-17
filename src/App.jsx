
import React, {  useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authslice"
import {Outlet} from "react-router-dom"
import {Header,Footer} from './components/index'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  
useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
0    }else{
  dispatch(logout())
}
  })
  .finally(()=>setLoading(false))
},[])

return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>

      <Header/>
      <main>
      <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>      
) :null
}

export default App
