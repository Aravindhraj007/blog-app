import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthContext'
import ImgUpload from '../components/ImgUpload'
import { NotificationContext } from '../context/NotificationContext'
import { ThemeContext } from '../context/ThemeContext'

function Write() {
  axios.defaults.withCredentials = true

  const {setIsMenu} = useContext(ThemeContext)
  const { isAuth } = useContext(AuthContext)
  const { warningMsg, successMsg, errorMsg } = useContext(NotificationContext)
  const navigate = useNavigate()
  const state = useLocation().state
  
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(state?.title || '')
  const [desc, setDesc] = useState(state?.desc || '')
  const [cate, setCate] = useState(state?.cate || '')

  const upload = async () => {
    try{
      if(file === null){
        return null
      }
      const formData = new FormData()
      formData.append("file", file)
      const res = await axios.post('http://localhost:3000/fileUpload', formData)
      return res.data
    }catch(err){
      errorMsg(err.response.data)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if(title === '' || desc === ''){
      warningMsg('Contents are empty')
      return 
    }
    const imgPath = await upload()

    if(state === null && imgPath === null){
      warningMsg("Image is not present")
      return
    }
    const value = {
        title,
        desc,
        cate,
        path: imgPath
      }
    
    try{
      const res = state !== null ? 
      await axios.put('http://localhost:3000/edit', {...value, postNo: state.post_no})
      : await axios.post('http://localhost:3000/upload', value)
      successMsg(res.data)
      setCate('')
      setDesc('')
      setFile(null)
      setTitle('')
      navigate('/')

    }catch(err){
      errorMsg(err.response.data)
    }
  }

  useEffect(() => {
    if(!isAuth){
      navigate('/login')
    }
    setIsMenu(false)
  }, [])
  
  return (
    <WritePage>
      <div className="write-head">
        <h1>Write Page</h1>
      </div>

      <div className="write-content">

        <div className="content-area">

          <div className="write-content-title">
            <label htmlFor='title'>Title :</label>
            <div className="w-input">
              <input 
                type="text" 
                name="title" 
                id='title'
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="description">
            <label htmlFor='content'>Content :</label>
            <div className="w-input">
              <textarea 
                name="content" 
                id='content'
                rows="13"
                placeholder='Description' 
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
          </div>

        </div>

        <div className="upload">

          <div className="file">
            <ImgUpload 
              setFile={setFile}
            />
          </div>

          <div className="col-2">
            <div className="upload-btn">
              <button type='submit' onClick={handleUpload}>Upload</button>
            </div>

            <div className="category">
              
              <div className="cat">
                <input type="radio" name="cat" id="art" value='Art' checked={cate ==='Art'} onChange={e => setCate(e.target.value)}/>
                <label htmlFor="art">Art</label>  
              </div>   

              <div className="cat">
                <input type="radio" name="cat" id="food" value='Food' checked={cate==='Food'} onChange={e => setCate(e.target.value)}/>
                <label htmlFor="food">Food</label>
              </div>

              <div className="cat">
                <input type="radio" name="cat" id="sports" value='Sports' checked={cate==='Sports'} onChange={e => setCate(e.target.value)}/>
                <label htmlFor="sports">Sports</label></div>         
            </div>
          </div>
        </div>
      </div>
    </WritePage>
  )
}

export default Write

const WritePage = styled.main`
  width: 100%;
  height: 100vh;
  background-color: var(--BG);
  padding: 100px 5%;

  
  .write-head{
    text-align: center;
    h1{
      color: var(--IMP);
    }
  }

  .write-content{
    margin-top: 20px;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 20px;

    .content-area{
      grid-column-start: 1;
      grid-column-end: 3;

      .write-content-title,
      .description{
        display: flex;
        flex-direction: column;
      }

      .description{
        margin-top: 15px;
      }

      .w-input{
        display: flex;
        justify-content: flex-end;
      }
      label{
        
        padding-bottom: 10px;
      }

      input,
      textarea,
      {
        width: 95%;
        padding: 5px 10px;
      }
    }

    .upload{
      margin-top: 10px;
      .col-2{
        margin-top: 20px;
        display: flex;
        flex-direction: column-reverse;

        .upload-btn{
          margin-top: 20px;

          button{
            padding: 10px 40px;
            font-weight: 900;
            font-size: 1.3rem;
          }
        }
        
      }
    }
  }

  @media screen and (max-width: 800px){
    .write-content{
      display: block;
      margin-top: 10px;

      .content-area .w-input{
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .upload{
        padding: 0 20px;

        .col-2{
          margin-top: 10px;
          display: grid;
          grid-template-columns: auto auto;

          .upload-btn{
            margin-top: 0;

            button{
              padding: 7px 30px;
              font-weight: 600;
              font-size: 1.3rem;
            }
        }
        }
      }
    }
  }

  @media screen and (max-width: 400px){
    padding-top: 70px;
  }

`