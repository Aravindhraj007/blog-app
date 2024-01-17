import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NotificationContext } from '../context/NotificationContext'
import { AuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import PostProfile from '../components/PostProfile'
import DownBar from '../components/DownBar'

function Single() {
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const { errorMsg } = useContext(NotificationContext)
  const {isAuth} = useContext(AuthContext)
  const item = useLocation().state
  const [isLiked, setIsLiked] = useState(false)
  
  useEffect(() => {
    const isLikedPost = async() => {
      try{
        const res = await axios.get(`http://localhost:3000/isLiked/${item.post_no}`)
        setIsLiked(res.data)
      }catch(err){
        errorMsg(err.response.data)
      }
    }

    if(!isAuth){
      navigate('/login')
    }else{
      isLikedPost()
    }
  }, [])

  
  return (
    <SinglePage>
      <PostProfile 
        item={item}
      />

      <div className="post-area">
        <div className="post">
          <img src={`/images/${item.img_path}`} alt="" />
        </div>
        <div className="description">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
        </div>
      </div>

      <div className="down-bar">
        <DownBar 
          isLiked = {isLiked}
          setIsLiked = {setIsLiked}
          postNo={item.post_no}
        />
      </div>

    </SinglePage>
  )
}

export default Single

const SinglePage = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: var(--BG);
  padding: 100px 5%;
  color: var(--COLOR);
  
  .post-area{
    display: flex;
    padding: 20px 0;
    .post{
      padding: 0 30px;
      img{
        width: 500px;
        height: auto;
        object-fit: contain;
      }
    }

    .description{
      padding: 0 30px;
      h3{
        margin-bottom: 10px;
      }
      p{
        text-indent: 2rem;
      }
    }
  }

  @media screen and (max-width: 1280px){
    .post-area .post{
      img{
        width: 500px;
        height: auto;
        object-fit: contain;
      }
    }

  }


  @media screen and (max-width: 920px){
    .post-area{
      display: block;
    .post{
      width: 100%;
      display: flex;
      justify-content: center;
      img{
        width: 600px;
        height: auto;
        object-fit: contain;
      }
    }

    .description{
      margin-top: 10px;
      padding: 0 50px;
      h3{
        margin-bottom: 10px;
      }
      p{
        text-indent: 2rem;
      }
    }
  }
  }

  @media screen and (max-width: 720px){
    .post-area {
      .post img{
        width: 500px
      }
      .description{
        padding: 0 40px;
      }
    }
  }

  @media screen and (max-width: 600px){
    .post-area {
      .post img{
        width: 400px
      }
      .description{
        padding: 0 20px;
      }
    }
  }

  @media screen and (max-width: 490px){
    .post-area {
      .post img{
        width: 350px
      }
      .description{
        padding: 0 10px;
      }
    }
  }

  @media screen and (max-width: 420px){
    .post-area {
      .post img{
        width: 300px
      }
      .description{
        padding: 0 7px;
      }
    }
  }

  @media screen and (max-width: 400px){
        padding-top: 70px;
  }

  @media screen and (max-width: 355px){
    .post-area {
      .post img{
        width: 250px
      }
      
      .description{
        padding: 0 5px;
      }
    }
  }

  
`