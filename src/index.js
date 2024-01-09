import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

import style from "./style.module.css";

let app = document.getElementById("app");

let field = [
    {state:undefined, id:1}, {state:undefined, id:2}, {state:undefined, id:3},
    {state:undefined, id:4}, {state:undefined, id:5}, {state:undefined, id:6},
    {state:undefined, id:7}, {state:undefined, id:8}, {state:undefined, id:9}
]

function App(){
    return(
        <div>
            <h1>Tic-Tac-Toe</h1>
            <div className={style.outside}>
                <div className={style.field}>
                    {field.map((cell) => (
                        <div key={cell.id} className={style.cell}>
                            {cell.state}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(App(), app)