import React from 'react';
import { Route , Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Chat from './pages/chat/chat';
import ProfileUpdate from './pages/profileupdate/profileupdate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const app = ()=>{
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