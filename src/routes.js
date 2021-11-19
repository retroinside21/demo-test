import React from "react"
import { Redirect, Route } from "react-router"
import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import { AuthoticationPage } from "./components/AuthoticationPage"
import { MainPage } from "./components/MainPage/MainPage"
import { NavPage } from "./components/NavPage"

export const useRoutes = isAuth => {
    if(isAuth){
        return(
        <Switch>
          <Route path="/mainpage" exact>
              <MainPage />
          </Route>
          <Route path="/mainpage" exact>
              <NavPage path="/navpage" exact />
          </Route>
          <Route path="/links">
            
          </Route>
          
          <Redirect to="/mainpage"/>
        </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthoticationPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}