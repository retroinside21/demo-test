import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHookAPI } from "../hooks/hookApi"

export const AuthoticationPage = () => {

    const auth = useContext(AuthContext)
    const {request} = useHookAPI() 
    const [form, setForm] = useState({
        username: "",
        password: ""
    })  

    const changeHandler = e =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async () => {
        try {
          const data = await request('http://erp.apptrix.ru/api/token/', 'POST', {...form})
          auth.login(data.access, data.refresh)
        } catch (e) {}
      }
    
    return (
        <div className="row">
            <div className="col s12 offset-s3">
                <h1>Тестовое задание</h1>
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-4">
                            <div className="card-content white-text">
                                <span className="card-title ">Авторизация</span>
                                <div>
                                    <div className="input-field ">
                                        <input
                                            placeholder="Введите login"
                                            id="username"
                                            type="text"
                                            className="validate"
                                            name="username"
                                            onChange={changeHandler}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            className="validate"
                                            placeholder="Введите пароль"
                                            onChange={changeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card-action ">
                                <button 
                                className="btn grey darken-1"
                                onClick={loginHandler}
                                >Войти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}