import axios from "axios"
import React, { useEffect, useState } from "react"
import "./BreakingCharacters.css"

import { Loading } from "../Loading/Loading"
import { BBcharacter } from "./BBcharacter"

export const BreakingCharacters = () => {

    const [characters, setChatacters] = useState()
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalsUsersCount, setTotalUsersCount] = useState()

    let pageSize = 6
    let pageCount = Math.ceil(totalsUsersCount/pageSize)
    let pages = []
    
    for(let i=1; i <= pageCount; i++){
        pages.push(i)
    }


    function charCount() {
        axios.get(`https://www.breakingbadapi.com/api/characters?limit=${pageSize}&offset=${currentPage}`).then(result => {
            setChatacters(result.data)
            setLoading(false)
        })
    }

    function totalUsers() {
        axios.get(`https://www.breakingbadapi.com/api/characters`).then(result => {
            setTotalUsersCount(result.data.length)
            setLoading(false)
        })
    }

    

    useEffect(() => {
        charCount()
        totalUsers()
        setCurrentPage(currentPage)
    }, [currentPage])


    if (loading || characters === undefined) {
        return <Loading />
    }
    const items = characters.map(item => {
        return <BBcharacter key={item.char_id} {...item} />
    })

    const togglePage = (id) =>{
        setCurrentPage(id)
    }

    return (<div >
        <h1>Breakin bad Characters</h1>
        <ul className="pagination">
            {pages.map(p=>{
              return <li 
                key={p} 
                className={currentPage === p ? 'active' : null}
                onClick={()=> togglePage(p)}
                ><a>{p}</a></li>
            })}
        </ul>
    <div className="characters-items">
        {items}
    </div>
    </div>)

}