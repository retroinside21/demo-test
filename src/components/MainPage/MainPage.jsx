import React, { useEffect, useState } from "react"
import "./MainPage.css"
import { useYouTrackApi } from "../../hooks/hookApi"
import { Loading } from "../Loading/Loading"



let count = 10

export const MainPage = () => {
    const [table, setTable] = useState([])
    const [title, setTitle] = useState('')
    const [term, setTerm] = useState('')
    const [loading, setLoading] = useState(true)
    

    const { reques } = useYouTrackApi()
    const loadTable = async () => {
        try {
            const data = await reques('https://example.youtrack.cloud/api/issues?fields=id,summary,project(name)', 'GET', JSON.stringify(), {
            'Authorization':'Bearer perm:amFuZS5kb2U=.UkVTVCBBUEk=.wcKuAok8cHmAtzjA6xlc4BrB4hleaX',
             } )
            const items = data.slice(0, 3)
            setLoading(false)
            setTable([...items])
        }
        catch (e) {
            console.log(`${e.message} что то пошло не так`)
        }
    }

    const addItem = () => {
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
        // load()
    }, [])

    const items = table.filter((el)=>{
        if(term ===''){
            return table
        } else if(el.summary.toLowerCase().includes(term.toLowerCase())){
            return el
        }
    })
    .map( (item) => {
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


    if (loading || items === undefined) {
        return (<Loading/>)
    }

 return (
        <div>
            <h1 className="main__title">Cписок полученный из API</h1>
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
                <input
                        onChange={event => setTerm(event.target.value)}
                        value={term}
                        placeholder="Поиск элемента"
                        type="text"
                        className="validate" />
                </div>
            </div>
            <table className="striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Имя проекта</th>
                        <th>Список дел</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}