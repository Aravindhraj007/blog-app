import React, {useContext, useState} from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import UserProfile from './UserProfile'
import styled from 'styled-components'
import TitleCard from './Title'
import MenuIcon from '@mui/icons-material/Menu'
import CancelIcon from '@mui/icons-material/Cancel'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

function Header() {
  const {isDark, handleChangeTheme, isMenu, setIsMenu} = useContext(ThemeContext)
  const {isProfile, setIsProfile, currentUser, isAuth} = useContext(AuthContext)
  
  const menuOpen = () => {
    setIsMenu(true)
  }
  const menuClose = () => {
    setIsMenu(false)
  }

  const handleOnProfile = () => {
    setIsProfile(true)
  }

  const handleOffProfile = () => {
    setIsProfile(false)
  }

  return (
    <HeaderComponent $isleft={isMenu}>
      <div className="h-title">
        <TitleCard 
          title='Blog'
        />
      </div>

      <div className="h-menu">
          <ul>
              <div className="cancel-icon" onClick={menuClose}>
                <CancelIcon />
              </div>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/?cat=art">Art</Link></li>
              <li><Link to="/?cat=sports">Sports</Link></li>
              <li><Link to="/?cat=food">Food</Link></li>
              <li><Link to="/write">Write</Link></li>
              {
                !isAuth ?
                <li><Link to="/login" className='menu-login'>Login</Link></li> :
                <li onClick={handleOnProfile}>{currentUser}</li>
              }
              <li onClick={handleChangeTheme} className='theme'>{isDark ? <DarkModeIcon /> : <LightModeIcon />}</li>
          </ul>
        <div className="menu-icon" onClick={menuOpen}>
          <MenuIcon />
        </div>
      </div>

      {isProfile && 
        <UserProfile 
          handleOffProfile = {handleOffProfile}
        />
      }

    </HeaderComponent>
  )
}

export default Header

const HeaderComponent = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: var(--IMP);
  padding: 0 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  .h-menu{
    ul{
      display: flex;
      li{
        cursor: pointer;
        color: var(--TITLE);
        list-style: none;
        margin-left: 20px;
        a{
          color: var(--TITLE);
          &:hover{
            text-decoration: underline;
          }
        }

        .menu-login{
          padding-left: 24px;
          font-weight: bolder;
        }

      }
    }

    .menu-icon,
    .cancel-icon{
      display: none;
    }
  }


  @media screen and (max-width: 600px){
    .h-menu ul{
      height: 100vh;
      width: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      transition: 0.6s;
      transform: ${props => props.$isleft ? 'translateX(50%)' : 'translateX(100%)'};
      display: block;
      background-color: var(--IMP);
      z-index: 10;
      border-left: 2px solid var(--TITLE);
      padding: 30px 0 0 30px;

      li{
        padding-top: 25px;

        .menu-login{
          padding: 0;
        }
      }
      
    }

    .h-menu .menu-icon,
    .h-menu .cancel-icon{
      display: block;
      color: var(--TITLE);
    }


  }

  @media screen and (max-width: 400px){
    height: 50px;
    .h-title h1{
      font-size: 2.5rem;
    }
  }

  @media screen and (max-width: 350px){
    .h-menu ul{
      transform: ${props => props.$isleft ? 'translateX(30%)' : 'translateX(100%)'};;
    }
  }
`