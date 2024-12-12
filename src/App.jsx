import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import {Slide, ToastContainer} from  'react-toastify'
import Login from './page/Login'
import OAuthCallback from './components/OAuthCallback'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './page/Home'
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
       <AuthProvider>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>

<BrowserRouter>
        <Routes>
          <Route>
          <Route path='/login' element={<Login />}/>
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path='/' element={<ProtectedRoute element={<Home />} />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </AuthProvider>
    </>
  )
}

export default App
