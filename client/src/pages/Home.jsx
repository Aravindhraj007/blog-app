import React, { useContext, useEffect, useState } from 'react'
import Section from '../components/Section'
import styled from 'styled-components'
import axios from 'axios'
import Loading from '../components/Loading'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

function Home() {
  axios.defaults.withCredentials = true

  const {setIsMenu} = useContext(ThemeContext)
  const {error, setError} = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const cat = useLocation().search

  useEffect(() => {
    const apiCall = async () => {
      setIsLoading(true)
       try{
          const res = await axios.get(`http://localhost:3000/${cat}`)
          setError('')
          setIsLoading(false)
          setItems(res.data)
        }catch(err){
          setError(err.message)
        }finally{
          setIsLoading(false)
        }
    }

    setIsMenu(false)
    apiCall()
  }, [cat])


  return (
    <HomePage>
      {isLoading && <Loading />}
      {!isLoading && error && <p className='error'>{error}</p>}
      {!error && items.map(item => {
        return <Section key={item.post_no}
          item={item}
        />
      })}

    </HomePage>
  )
}

export default Home

const HomePage = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: var(--BG);
  padding: 100px 5%;

  .error{
    font-size: 1.8rem;
    color: var(--ERROR);
    font-weight: 900;
    white-space: nowrap;
    z-index: 1;

  }

  @media screen and (max-width: 400px){
    padding-top: 70px;
  }
`