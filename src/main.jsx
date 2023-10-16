import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login'
import Registration from './Components/Registration/Registration'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/regi" element={<Registration />}/>
        <Route path="/home" element={<Home />}/>
         
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
