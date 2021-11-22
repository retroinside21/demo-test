import React, { useEffect, useState } from "react"
import "./MainPage.css"
// import { items } from "./collection"
import { useYouTrackApi } from "../../hooks/hookApi"



let count = 10

export const MainPage = () => {
    const [table, setTable] = useState([])
    const [title, setTitle] = useState('')

    const { reques } = useYouTrackApi()
    const loadTable = async () => {
        try {
            const data = await reques('https://example.youtrack.cloud/api/issues?fields=id,summary,project(name)', 'GET', JSON.stringify(), {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization':'Bearer perm:amFuZS5kb2U=.UkVTVCBBUEk=.wcKuAok8cHmAtzjA6xlc4BrB4hleaX',
            'Cache-Control': 'no-cache' } )
            const items = data.slice(0, 3)
            setTable([...items])
        }
        catch (e) {
            console.log(`${e.message} что то пошло не так`)
        }
    }

    const addItem = (e) => {
     
        setTable([...table,
            {
                project: {
                    name: 'Sample Project'
                },
                id: `2-${count++}`,
                summary: title
            }
            ])
            setTitle('')
    
    }


    const deleteItem = (id) => {
        setTable(table.filter(el => {
            return el.id !== id
        }))
    }

    useEffect(() => {
        loadTable()
    }, [])

    const items = table.map(item => {
        const { id, summary } = item
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{item.project.name}</td>
                <td>{summary}</td>
                <button
                    className="waves-effect waves-light btn"
                    onClick={() => deleteItem(id)}
                >Delete</button>
            </tr>
        )
    })

 return (
        <div>
            <h1 className="main__title">Cписок таблицы</h1>
            <div>
                <div>
                    <input
                        onChange={event => setTitle(event.target.value)}
                        value={title}
            
                        placeholder="Добавьте элемент"
                        type="text"
                        className="validate" />
                    <button
                        className="waves-effect waves-light btn"
                        onClick={addItem}
                    >Добавить</button>
                </div>
             
            </div>
            <table className="striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}