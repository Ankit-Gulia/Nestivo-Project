
import React, {useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Details from './pages/Details.jsx'
import Add from './pages/Add.jsx';
import Edit from './pages/Edit.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/Protected.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
          <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Navigate to="/property" />} />
          <Route path='/property' element={<Home/>} />
          <Route path='/property/:id' element={<Details/>}/>
          <Route path='/property/add' element={
            <ProtectedRoute>
              <Add/>
            </ProtectedRoute>
          }/>
          <Route path='/property/:id/edit' element={
            <ProtectedRoute>
              <Edit/>
            </ProtectedRoute>
            }/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
    )
}

export default App
