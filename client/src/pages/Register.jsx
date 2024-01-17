import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NotificationContext } from '../context/NotificationContext'
import styled from 'styled-components'
import Title from '../components/Title'
import InputField from '../components/InputField'
import Email from '../components/Email'

function Register() {
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const {successMsg, errorMsg, warningMsg} = useContext(NotificationContext)
  const [values, setValues] = useState({})
  const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  const apiCall = async () => {
    try{
      const res = await axios.post('http://localhost:3000/register', values)
      console.log(res.data)
      setValues({})
      successMsg(res.data)
      navigate('/login')
    }catch(err){
      errorMsg(err.response.data)
    }
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!(regex.test(values.email))){
      warningMsg("Not valid mail")
      return
    }
    
    apiCall()
  }

  return (
    <RegisterPage>
      <div className="r-form">
        <div className="r-title">
          <Title 
            title='Register Form'
          />
        </div>
        <form onSubmit={handleSubmit}>
          <InputField 
            type='text'
            placeholder='Enter username here'
            label='Username'
            name='username'
            handleChange = {handleChange}
          />

          <InputField 
            type='email'
            placeholder='Email here'
            name='email'
            label='email'
            handleChange = {handleChange}
          />

          <InputField 
            type='password'
            placeholder='Password here'
            name='password'
            label='Password'
            handleChange = {handleChange}
          />

          <InputField 
            type='password'
            placeholder='Confirm password'
            name='confirm'
            label='Confirm Password'
            handleChange = {handleChange}
          />

          <div className="submit-btn">
            <button>Register</button>
          </div>

          <div className="f-link">
            <p>Login? <a href="/login"> Click here</a></p>
          </div>
        </form>
      </div>
    </RegisterPage>
  )
}

export default Register

const RegisterPage = styled.section`
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
      /* margin-top: 10px; */
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