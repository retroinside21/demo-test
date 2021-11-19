import { createContext } from "react";
function empty(){
}
export const AuthContext = createContext ({
    access: null,
    refresh:null,
    login: empty(),
    logout: empty(),
    refreshToken:empty(),
    isAuth: false
}) 