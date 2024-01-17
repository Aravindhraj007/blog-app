import React, { useContext } from 'react'
import {NotificationContext} from '../context/NotificationContext'
import styled from 'styled-components'
import axios from 'axios'

function DeleteConfirm({ handleDeletePost, postId }) {
  axios.defaults.withCredentials = true

  const {successMsg, errorMsg} = useContext(NotificationContext)
  const handleDeleteConfirm = async () => {
    try{
      const res = await axios.delete(`http://localhost:3000/deletePost/${postId}`)
      successMsg("Deleted successfully")
    }catch(err){
      errorMsg(err.response.data)
    }
    handleDeletePost()
  }
  return (
    <DeleteConfirmComponent>
        <div className="delete-content">
          <h2>You want to delete this post ?</h2>
          <div className="group-btn">
              <button onClick={handleDeleteConfirm}>Confirm</button>
              <button onClick={handleDeletePost}>Cancel</button>
          </div>
        </div>
    </DeleteConfirmComponent>
  )
}

export default DeleteConfirm

const DeleteConfirmComponent = styled.section`
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--IMP);

    .delete-content{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border: 3px solid var(--TITLE);

      h2{
        text-align: center;
        color: var(--TITLE);
      }
      .group-btn{
        width: 100%;
        display: flex;
        justify-content: space-around;

        button{
          color: var(--IMP);
          background-color: var(--TITLE);
          font-size: 1.4rem;
          font-weight: bolder;
          padding: 7px 17px;
          cursor: pointer;

          &:hover,
          &:active{
            background-color: var(--HOVER);
          }
        }
      }
    }

    

    @media screen and (max-width: 670px){
      width: 400px;
      height: 250px;
    }

    @media screen and (max-width: 480px){
      width: 300px;
      height: 200px;

      h2{
        font-size: 1rem;
      }
      .delete-content .group-btn button{
        font-size: 1rem;
        font-weight: 600;
        padding: 4px 12px;
      }
    }

    @media screen and (max-width: 380px){
      width: 250px;
      height: 180px;

    }
    
`