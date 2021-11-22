import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const NavPage = () => {

    const auth =  useContext(AuthContext)
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
    }
    return (
        <div>
            <nav className="teal darken-3">
                <div className="nav-wrapper container">
                    <a href="/" className="brand-logo">Demo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to="/mainpage">Список таблицы</NavLink></li>
                        <li><NavLink to="/datausers">О пользователе</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}