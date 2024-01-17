import { createContext, useEffect, useState } from "react";
import secureLocalStorage from 'react-secure-storage'
import axios from "axios";

export const AuthContext = createContext()

export const AuthContextProvider = ( {children} ) => {
    axios.defaults.withCredentials = true
    
    const [isProfile, setIsProfile] = useState(false)
    const [currentUser, setCurrentUser] = useState(JSON.parse(secureLocalStorage.getItem('user')) || '')
    const [isAuth, setIsAuth] = useState(JSON.parse(secureLocalStorage.getItem('isAuth')) || false)
    const [error, setError] = useState('')
    const [userId, setUserId] = useState(JSON.parse(secureLocalStorage.getItem('id')) || null)

    const login = async(values) => {
        const res = await axios.post('http://localhost:3000/login', values)
        setCurrentUser(res.data)
    }

    const logout = async() => {
        const res = await axios.get('http://localhost:3000/logout')
        setCurrentUser(null)
        setIsAuth(false)
        setUserId(null)
        return res
    }

    
    useEffect(() => {
        const isAuthorized = async() => {
            try{
                setError('')
                const res = await axios.get('http://localhost:3000/token')
                secureLocalStorage.setItem('isAuth', JSON.stringify(res.data.isTrue))
                setIsAuth(res.data.isTrue)
                if(res.data.isTrue){
                    setCurrentUser(res.data.auth.name)
                    setUserId(res.data.auth.id)
                    secureLocalStorage.setItem('id', JSON.stringify(res.data.auth.id))
                }else{
                    setCurrentUser(null)
                    setUserId(null)
                }
            }catch(err){
                setError(err.message)        
            }
        }
        
        isAuthorized()
        secureLocalStorage.setItem('user', JSON.stringify(currentUser))
        secureLocalStorage.setItem('id', JSON.stringify(userId))
    }, [currentUser])


    return <AuthContext.Provider value={{
        currentUser,
        isAuth,
        userId,
        isProfile,
        setIsProfile,
        login,
        logout,
        setError,
        error
    }}> 
        {children} 
        </AuthContext.Provider>
}