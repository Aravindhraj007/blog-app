import React, { useContext } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from './pages/Single'
import Write from './pages/Write'
import { ThemeContext } from './context/ThemeContext'
import ToastNotify from './components/ToastNotify'
import { NotificationContext } from './context/NotificationContext'


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/single/:id',
        element: <Single />
      },
      {
        path: '/write',
        element: <Write />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

function App() {

  const {isDark} = useContext(ThemeContext)
  const { successMsg, errorMsg, warningMsg} = useContext(NotificationContext)

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <RouterProvider router={router} />
      <ToastNotify />
    </div>
  )
}

export default App