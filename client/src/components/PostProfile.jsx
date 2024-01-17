import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteConfirm from './DeleteConfirm'

function PostProfile({item}) {
    const [isDelete, setIsDelete] = useState(false)
    const { isProfile, userId } = useContext(AuthContext)

    const handleDeletePost = () => {
        setIsDelete(!isDelete)
    }

  return (
    <ProfileComponent>
        <div className="profile">
            <div className="profile-img">
                {item.profile ?
                    <img src={`/images/${item.profile}`} alt="" /> :
                    <img src="/default/default.jpg" alt="" />
                }
                
            </div>
            <div className="user-name">
                <h2>{item.user_name}</h2>
            </div>
        </div>

        <div className="tools">
            {userId === item.user_id ?
                <>
                    <div className="edit-icon">
                        <Link to={`/write/?edit=${item.post_no}`} state={item}>
                            <EditIcon />
                        </Link>
                    </div>
                    <div className="delete-icon"
                        onClick={handleDeletePost}
                    >
                        <DeleteIcon />
                    </div>
                </>  :
                null   
        }
        </div>

        {
            !isProfile &&
            isDelete && 
            <DeleteConfirm 
                handleDeletePost={handleDeletePost}
                postId = {item.post_no}
            />
        }

    </ProfileComponent>
  )
}

export default PostProfile

const ProfileComponent = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--IMP);

    .profile{
        display: flex;
        align-items: center;
        padding-left: 3%;
        .profile-img {
            img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid var(--TITLE);
            object-fit: contain;
        }
        }
        .user-name {
            padding-left: 20px;
            h2{
                color: var(--TITLE);
            }
        }
    }
    .tools{
        padding-right: 3%;
        display: flex;
        align-items: center;

        .delete-icon,
        .edit-icon{
            cursor: pointer;
            color: var(--TITLE);
        }

        .delete-icon{
            margin-left: 20px;
        }

        .edit-icon{
            a{
                color: var(--TITLE);
            }
        }
    }


    @media screen and (max-width: 600px){
        height: 60px;

        .profile .profile-img img{
            width: 46px;
            height: 46px;
        }
    }

    @media screen and (max-width: 400px){
        height: 40px; 

        .profile .profile-img img{
            width: 30px;
            height: 30px;
        }
    }

`