import React from "react";
import "./RickandMorty.css"


export const RaMcharacter = ({name,gender,image,species}) =>{
    return (
        <div className="characters-item">
            <img src={image} alt="avataChar" />
            <div>
                <h4>
                {name}
                </h4>
                <p> <span>Gender :</span>  {gender}</p>
                <p> <span>Species :</span>  {species}</p>
            </div>
        </div>
    )
}