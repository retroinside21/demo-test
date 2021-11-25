import React, { useEffect, useState } from "react"

import { useYouTrackApi } from "../../hooks/hookApi"
import { Loading } from "../Loading/Loading"



export const DataUsers = () => {
    const [users, setTable] = useState()
    const [loading, setLoadig] = useState(true)
 
    const { reques } = useYouTrackApi()
    const loadTable = async () => {
        try {
            const data = await reques('https://example.youtrack.cloud/api/admin/users/me?fields=id,login,name,email', 'GET', JSON.stringify(),{
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization':'Bearer perm:am9obi5kb2U=.UG9zdG1hbiBKb2huIERvZQ==.jJe0eYhhkV271j1lCpfknNYOEakNk7',
                'Cache-Control': 'no-cache'
            })
            setLoadig(false)
            setTable({...data})
        }
        catch (e) {
            console.log(`${e.message} что то пошло не так`)
        }
    }
    useEffect(()=>{
        return loadTable()
    },[])

  
    if(loading || users === undefined){
        return (<Loading/>)
    }

   

    return (
        <div>
            <h1 className="main__title">Данные пользователя</h1>
            <table className="striped">
                <thead>
                    <tr>
                        <th>EMAIL</th>
                        <th>Name</th>
                        <th>Login</th>
                    </tr>
                </thead>
                <tbody>
                    <tr >
                        <td>{users.email}</td>
                        <td>
                            {users.name}
                        </td>
                        <td>{users.login}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}