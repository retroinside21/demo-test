import { useCallback, useState,useEffect } from "react"

const storageObj = 'userData'

export const useAuth = () =>{

    const [access, setAccessToken] = useState(null)
    const [refresh, setToken] = useState(null)
    const login = useCallback((jwtTokenAccess,jwtTokenRefresh)=>{
        setAccessToken(jwtTokenAccess)
        setToken(jwtTokenRefresh)
        localStorage.setItem(storageObj, JSON.stringify({
            access : jwtTokenAccess,
            refresh : jwtTokenRefresh
        }))
    }, [])

   const refreshToken = useCallback((jwtTokenRefresh)=>{
    setToken(jwtTokenRefresh)
    localStorage.setItem(storageObj, JSON.stringify({
        access : refresh
    }))
    
   }, [refresh])

    const logout = useCallback(()=>{
        setAccessToken(null)
        setToken(null)
        localStorage.removeItem(storageObj)
    },[])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageObj))
        if (data && data.access){
            login(data.access ,data.refresh)
        }
      }, [login])

    return {login,logout, access,refresh, refreshToken}
}