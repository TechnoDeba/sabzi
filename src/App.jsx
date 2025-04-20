import React from 'react'
import './index.css';
import Home from './Pages/Home';
import {ToastContainer} from "react-toastify"
const App = () => {
  return (
    <div >
      <Home/>
      <ToastContainer />
    </div>
  )
}

export default App