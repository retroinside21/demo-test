import { useState, useCallback, useContext } from "react"
import { AuthContext } from "../context/AuthContext"



export const useHookAPI= () => {
    const [loading, setLoading] = useState(false)
    const auth = useContext(AuthContext)

 
  
    const request = useCallback(async (url, method = 'POST', body = null, headers = {}) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }
  
        const response = await fetch(url, {method, body, headers})
        const data = await response.json()

        if(response.status === 401){
          const data = await request('http://erp.apptrix.ru/api/token/refresh/', 'POST')
          auth.refreshToken(data.refresh)
        }
        else {
          localStorage.removeItem('userData')
        }
      
        if (!response.ok) {
          
          throw new Error(response.status || 'Что-то пошло не так')
        }
       

        
  
        setLoading(false)
  
        return data
      } catch (e) {
        console.log('Error: ' + e.message);
        setLoading(false)
      }
    }, [auth])
    
   

  
    return { loading, request}
}