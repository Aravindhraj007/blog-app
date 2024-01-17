import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { NotificationContext } from '../context/NotificationContext'
import styled from 'styled-components'
import InputField from '../components/InputField'
import Title from '../components/Title'

function Login() {
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const { successMsg, errorMsg } = useContext(NotificationContext)
  const [values, setValues] = useState({})
  
  const apiCall = async () => {
    try{
      await login(values)
      setValues({})
      successMsg("Login successfully")
      navigate('/')
    }catch(err){
      errorMsg(err.response.data)
    }
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    apiCall()
  }

  return (
    <LoginPage>
      <div className="r-form">
        <div className="r-title">
          <Title 
            title='Login Form'
          />
        </div>
        <form onSubmit={handleSubmit}>
          <InputField 
            type='text'
            placeholder='Enter username here'
            name='username'
            label='Username'
            handleChange={handleChange}
          />

          <InputField 
            type='password'
            placeholder='Password here'
            name='password'
            label='Password'
            handleChange={handleChange}
          />

          <div className="submit-btn">
            <button>
              Login
            </button>
          </div>

          <div className="f-link">
            <p>Register? <a href="/register"> Click here</a></p>
          </div>
        </form>
      </div>
    </LoginPage>
  )
}

export default Login

const LoginPage = styled.section`
  width: 100%;
  height: 100vh;
  background-color: var(--IMP);
  display: flex;
  align-items: center;
  justify-content: center;
  .r-form{
    width: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .r-title{
      text-align: center;
      margin-bottom: 20px;
    }

    form{
      padding: 40px;
      margin-top: 10px;
      width: 480px;
      background-color: var(--BG);
    }
  }

  .information{
    margin-bottom: 20px;
    text-align: center;
  }

  .submit-btn{
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

    button{
      padding: 10px 40px;
      font-weight: 900;
      font-size: 1.3rem;
    }
    
  }

  .f-link{
    text-align: center;
  }

  @media screen and (max-width: 580px){
    .r-form{
      width: 100%;
      height: 100vh;

      .r-title{
        margin-top: 40px;
      }
      

      form{
        width: 100%;
        background-color: var(--IMP);
        color: var(--BG);

        .f-link{
          p{
            color: var(--BG);
            font-weight: 900;
            a{
              color: var(--TITLE);
            }
          }
        }

        button{
          background-color: var(--BG);
          color: var(--IMP);
        }
      }
    }
  }
`