import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../context/NotificationContext';
import styled from 'styled-components'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function UserProfile({handleOffProfile}) {
    axios.defaults.withCredentials = true

    const navigate = useNavigate()
    const {errorMsg} = useContext(NotificationContext)
    const {successMsg} = useContext(NotificationContext)
    const {currentUser, logout, userId} = useContext(AuthContext)
    const [profileImg, setProfileImg] = useState('')

    useEffect(() => {
        const getProfile = async() => {
            try{
                const res = await axios.get(`http://localhost:3000/getProfile/${userId}`)
                setProfileImg(res.data[0].profile)
            }catch(err){
                errorMsg(err.response.data)
            }
        }
        getProfile()
    }, [])

    const handleLogout = async() => {
        handleOffProfile()
        try{
            const res = await logout()
            successMsg(res.data)
            navigate('/')
        }catch(err){
            console.log(err)
        }
    }
  return (
    <UserProfileComponent>
        <div className="cancel-profile"
            onClick={handleOffProfile}
        >
            <CloseIcon />
        </div>
        <div className="profile-content">
            <div className="profile-img">
                {profileImg ?
                <img src={`/images/${profileImg}`} alt="" /> :
                <img src='default/default.jpg'/>
                }
                <h2>{currentUser}</h2>
            </div>
            <div className="logout-btn">
                <button
                    onClick={handleLogout}
                >Log Out</button>
            </div>
        </div>

    </UserProfileComponent>
  )
}

export default UserProfile

const UserProfileComponent = styled.section`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 500px;
    background-color: var(--BG);
    color: var(--COLOR);
    border: 3px solid var(--IMP);
    z-index: 20;

    .cancel-profile{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;
        cursor: pointer;
    }

    .profile-content{
        width: 100%;
        height: calc(100% - 60px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .profile-img{
            margin-top: -40px;
            text-align: center;
            h2{
                padding: 10px;
                color: var(--IMP);
            }
            img{
                width: 200px;
                height: 200px;
                border-radius: 50%;
                border: 5px solid var(--IMP);
            }   
        }

        .logout-btn{
            margin-top: 40px;
            cursor: pointer;

            button{
                padding: 15px 40px;
                font-size: 1.2rem;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
        }

    }

    @media screen and (max-width: 600px){
        width: 350px;
        height: 430px;
    }

    @media screen and (max-width: 440px){
        width: 300px;
        height: 380px;
        
        .profile-content{
        .profile-img{
            h2{
                padding: 8px 0;
            }
            img{
                width: 160px;
                height: 160px;
            }   
        }

        .logout-btn{
            margin-top: 30px;

            button{
                padding: 10px 28px;
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }
    }

    @media screen and (max-width: 380px){
        width: 250px;
        height: 360px;
        .profile-content{
        .profile-img{
            h2{
                padding: 5px 0;
            }
            img{
                width: 120px;
                height: 120px;
            }   
        }

        .logout-btn{
            margin-top: 20px;

            button{
                padding: 7px 20px;
                font-size: 1rem;
                font-weight: 600;
            }
        }
    }
    }
`

const CloseIcon = styled(HighlightOffIcon)`
    color: var(--IMP);
    scale: 1.4;
`