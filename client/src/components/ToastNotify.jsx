import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotificationContext } from '../context/NotificationContext'

function ToastNotify() {
  const {successMsg, errorMsg, warningMsg} = useContext(NotificationContext)
  return (
    <ToastContainer 
      limit={3}
      newestOnTop={true}
    />
  )
}

export default ToastNotify


