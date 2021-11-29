import React from "react";
import "./BreakingCharacters.css"


export const BBcharacter = ({name,birthday,img,nickname,occupation}) =>{
    return (
        <div className="characters-item">
            <img src={img} alt="avataChar" />
            <div>
                <h4>
                {name}
                </h4>
                <p>Birthday : {birthday}</p>
                <p>Nickname : {nickname}</p>
                <p>Ocupation : {occupation[0]}</p>
            </div>
        </div>
    )
}