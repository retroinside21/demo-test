import { useState, useCallback} from "react"




export const useYouTrackApi= () => {
  const [loading, setLoading] = useState(false)
  const reques = useCallback(async (url, method = 'POST', body = null, headers = {
  }) => {
    setLoading(true)
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(response.status || 'Что-то пошло не так')
      }
     
      setLoading(false)
      return  data
    } catch (e) {
      console.log('Error: ' + e.message);
      setLoading(false)
    }
  }, [])
  
  return { loading, reques}
}


export const useHookAPI= () => {
    const [loading, setLoading] = useState(false)
    const request = useCallback(async (url, method = 'POST', body = null, headers = {} ) => {
      setLoading(true)
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-type'] = 'application/json'
        }
  
        const response = await fetch(url, {method, body, headers})
        const data = await response.json()
  
        if (!response.ok) {
          throw new Error(response.status || 'Что-то пошло не так')
        }
       
        setLoading(false)
  
        return data
      } catch (e) {
        console.log('Error: ' + e.message);
        setLoading(false)
      }
    }, [])
    
   

  
    return { loading, request}
}