import { createContext, useState } from "react";
import secureLocalStorage from 'react-secure-storage'

export const ThemeContext = createContext()

export const ThemeContextProvider = ( {children} ) => {
    const [isDark, setIsDark] = useState(JSON.parse(secureLocalStorage.getItem('theme')))
    const [isMenu, setIsMenu] = useState(false)
    const handleChangeTheme = () => {
        setIsDark(!isDark)
        secureLocalStorage.setItem('theme', JSON.stringify(!isDark))
    }

    return <ThemeContext.Provider 
        value={{
            isDark, 
            handleChangeTheme,
            isMenu,
            setIsMenu
        }}
    >{children}</ThemeContext.Provider>
}