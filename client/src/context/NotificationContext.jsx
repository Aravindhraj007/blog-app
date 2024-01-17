import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { ThemeContext } from "./ThemeContext";
export const NotificationContext = createContext()

export const NotificationContextProvider = ({children}) => {
    const {isDark} = useContext(ThemeContext)
    const theme = isDark ? "dark" : "light"
    const successMsg = (msg) => {
        toast.success(msg,{
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              closeButton: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: `${theme}`,
            })
    }

    const errorMsg = (msg) => {
        toast.error(msg,{
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              closeButton: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: `${theme}`
            })
    }

    const warningMsg = (msg) => {
        toast.warning(msg,{
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              closeButton: false,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: `${theme}`
            })
    }

    

    return <NotificationContext.Provider 
        value={{
            successMsg,
            errorMsg,
            warningMsg,
        }}
    >{children}</NotificationContext.Provider>
}