import React, { useContext } from "react"
import "./MainPage.css"
import { AuthContext } from "../../context/AuthContext"
export const MainPage = () =>{
    const auth = useContext(AuthContext)


    return (
        <div>
            <h1 className="main__title">Authorization: Beare <span>{auth.access}</span></h1>
        </div>
    )
}