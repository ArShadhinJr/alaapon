import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login'
import Registration from './Components/Registration/Registration'
import './index.css'
import firebaseConfig from './Auth/Firebase';
import { Provider } from 'react-redux'
import { store } from './store';
import Forgot from './Components/Forgot/Forgot.jsx'
import Homee from './Components/Homee/Homee.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/regi" element={<Registration />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/homee" element={<Homee />}/>
        <Route path="/forgot" element={<Forgot />}/>
         
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
