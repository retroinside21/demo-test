import React from "react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { NavPage } from "./components/NavPage";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/hookAuth";
import { useRoutes } from "./routes";

function App() {

  const {access, login, refresh,logout} = useAuth()

  const isAuth = !!access 
  const routes = useRoutes(isAuth) 

 return(
   <AuthContext.Provider value={{login,logout,access,isAuth,refresh}}>
   <BrowserRouter>
    {isAuth && <NavPage/>}
     <div className="container">
       {routes}
     </div>
   </BrowserRouter>
   </AuthContext.Provider>
 )
}

export default App;
