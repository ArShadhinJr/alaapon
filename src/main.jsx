import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './Auth/firebase'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/regi" element={<Registration />}/>
         
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
