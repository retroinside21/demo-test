import axios from "axios"
import React, { useEffect, useState } from "react"
import "./RickandMorty.css"

import { Loading } from "../Loading/Loading"
import { RaMcharacter } from "./RaMcharacter"

export const RickandMorty = () => {

    const [characters, setChatacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [race, setRace] = useState('all')
    const [pages, setPages] = useState()
    const [num, setNum] = useState(3)
    let pagArr = []

    function charCount() {
        axios.get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`).then(result => {
            setPages(result.data.info.pages)
            setChatacters(result.data.results)
            setLoading(false)
        })
    }

    for (let i = 1; i < pages; i++) {
        pagArr.push(i)
    }

    useEffect(() => {
        charCount()
        setCurrentPage(currentPage)
    }, [currentPage])

    const addPerson = () => {
        setNum((prevValue) => prevValue + 3)
    }
    const deletePerson = () => {
        setNum((prevValue) => prevValue - 3)
    }


    if (loading || characters === undefined) {
        return <Loading />
    }
    const items = characters.map(item => {
        return <RaMcharacter key={item.id} {...item} />
    })
    const page = pagArr.map(el => {
        let cls = el === currentPage ? 'active' : 'waves-effect'
        return <li className={cls} onClick={() => setCurrentPage(el)} key={el}><a>{el}</a></li>
    })

    const visibleItems = items.filter((el) => {
        if (race === 'all') {
            return items
        }
        return el.props.species === race
    })

    return (<div >
        <h1>Rick and Morty</h1>
        <div className="container__ram">
            <div className="container__filter">
                <ul className="pagination">
                    {page.slice(0, 10)}
                </ul>
                <select
                    className="browser-default select"
                    onChange={(e) => setRace(e.target.value)}>
                    <option value="all">All</option>
                    <option value="Human">Human</option>
                    <option value="Alien">Alien</option>
                </select>

                <button onClick={() => addPerson()} className="waves-effect waves-light btn" > Load More</button>
                <button onClick={() => deletePerson()} className="waves-effect waves-light btn" > Delete Item</button>
            </div>
            <div className="characters-items">
                {visibleItems.slice(0, num)}
            </div>
        </div>


    </div>)

}