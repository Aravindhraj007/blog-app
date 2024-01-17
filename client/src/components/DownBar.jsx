import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { NotificationContext } from '../context/NotificationContext';

function DownBar({isLiked, setIsLiked, postNo}) {
  axios.defaults.withCredentials = true

  const { errorMsg } = useContext(NotificationContext)
  const [likes, setLikes] = useState({})

  const handleLike = async() => {
    try{
      const res = isLiked ? await axios.delete(`http://localhost:3000/removeLike/${postNo}` ) : 
                  await axios.post('http://localhost:3000/addLike', {postNo: postNo}) 
      setIsLiked(!isLiked)
    }catch(err){
      errorMsg(err.response.data)
    }
  }

  useEffect(() => {
    const getLikes = async () => {
      try{
        const res = await axios.get(`http://localhost:3000/getLikes/${postNo}`)
        setLikes(res.data)
      }catch(err){
        errorMsg(err.response.data)
      }
    }

    getLikes()
  }, [isLiked])

  return (
    <DownBarComponent>
      <section className='sec-1'>
        <div className="like"
          onClick={handleLike}
        >
          {isLiked ?
            <div className="liked">
              <FavoriteIcon />
            </div> :
            <div className="not-liked">
              <FavoriteBorderIcon />
            </div>
          } <span>{likes.length} Likes</span>
        </div>
        <div className="comments">
          
        </div>
      </section>
      <section className='sec-2'>
      </section>
    </DownBarComponent>
  )
}

export default DownBar

const DownBarComponent = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;

  .sec-1{
    display: flex;
    align-items: center;

    .like{
      display: flex;
      align-items: center;
      cursor: pointer;
      span{
        margin-left: 15px;
        font-size: 1.2rem;
        color: var(--COLOR-D);
      }

      .liked,
      .not-liked{
        scale: 1.4;
        padding: 0 5px;
        z-index: 1;
      }

      .liked{
        color: red;
      }
    }
    .comments{
      margin-left: 30px;
    }
  }

`

