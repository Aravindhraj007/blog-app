import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PostProfile from './PostProfile'

function Section({item}) {
  
  return (
    <SectionComponent>
      <div className="profile">
        <PostProfile 
          item = {item}
        />
      </div>

      <div className="post-area">
        <div className="post">
          <img src={`images/${item?.img_path}`} alt="" />
        </div>
        <div className="description">
          <div className="desc-1">
            <h3>{item.title}</h3>
            {item.desc.toString().length < 600 ?
              <p>{item.desc}</p> :
              <p>{item.desc.toString().slice(0, 600)}...</p>
            }
          </div>
          <div className="desc-2">
            <Link to={`/single/${item.post_no}`} state={item}>View More</Link>
          </div>
        </div>
      </div>

    </SectionComponent>
  )
}

export default Section

const SectionComponent = styled.li`
  margin-bottom: 20px;
  width: 100%;
  list-style: none;
  border: 2px solid var(--IMP);
  
  &:nth-child(even){
    .post-area{
      flex-direction: row-reverse;
    }
  }
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .desc-2{
        margin-top: 40px;
        margin-bottom: 20px;
        a{
          border: 2px solid var(--IMP);
          padding: 15px 40px;
        }
      }
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
      .desc-2{
        text-align: center;
      }
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

  @media screen and (max-width: 355px){
    .post-area {
      .post img{
        width: 250px
      }
      
      .description{
        padding: 0 5px;
        .desc-2{
          a{
            padding: 8px 25px;
          }
        }
      }
    }
  }

`