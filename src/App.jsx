import React, {useContext, useEffect } from 'react';
import { Route , Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import ProfileUpdate from './pages/profileupdate/profileupdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './config/firebase';
import { Appcontext } from './context/appcontext';


const app = ()=>{
  const navigate = useNavigate();
  const {loadUserData} = useContext(Appcontext)

  useEffect(() => {
  onAuthStateChanged(auth,async (user)=>{
    if(user){
      navigate('/chat')
      // console.log(user)
     await loadUserData(user.uid)
    }
    else{
      navigate('/')
    }
  })
  },[]);
  return(
    <>
    <ToastContainer />
    <Routes>

      <Route path='/' element={<Login />}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>

    </Routes>
    </>
  )
}

export default app;