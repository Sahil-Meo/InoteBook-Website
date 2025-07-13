import { createContext, useContext, useEffect, useState } from "react";

export const NoteContext = createContext()


export const NoteContextProvider = ({ children }) => {



    const [theme, setTheme] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")

        }
    }, [theme])



    const [user, setUser] = useState({
        name: "Sahil Meo",
        email: "meo@meo.com",
        username: "sahilmeo",
        avatar: "/Images/sahil.png"
    })

    const [auth_token, setAuth_Token] = useState(null)



    const [isauth, setIsAuth] = useState(false)

    return (
        <NoteContext.Provider value={{ user, setUser, isauth, setIsAuth, auth_token, setAuth_Token, theme, setTheme }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useContextwithContext = () => useContext(NoteContext)