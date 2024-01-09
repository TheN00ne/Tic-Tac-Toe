import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

import style from "./style.module.css";

let app = document.getElementById("app");

function App(){

    let [field, setField] = useState([
        {state:undefined, id:1}, {state:undefined, id:2}, {state:undefined, id:3},
        {state:undefined, id:4}, {state:undefined, id:5}, {state:undefined, id:6},
        {state:undefined, id:7}, {state:undefined, id:8}, {state:undefined, id:9}
    ]);

    let [myStep, setMyStep] = useState(true);

    let [steps, setSteps] = useState(0);

    function pc(){
        if((!myStep) && (steps < 9)){
            setSteps(steps + 1);
            let id = Math.round(Math.random() * 8);
            if(field[id].state == undefined){
                let arr = field.map((el) => {
                    if(el == field[id]){
                        return {state:"x", id: el.id}
                    }
                    else{
                        return el;
                    }
                })
                setField(arr);
            }
            else{
                pc();
            }
            setMyStep(true);
        }
    }

    useEffect(() => {
        setTimeout(pc, 500);
    }, [myStep])

    useEffect(() => {
        if(steps == 9){
            setMyStep("-");
        }
    }, [steps])

    return(
        <div>
            <h1>Tic-Tac-Toe</h1>
            <div className={style.outside}>
                <div className={style.field}>
                    {field.map((cell) => (
                        <div key={cell.id} className={style.cell} onClick={() => {
                            if(myStep){
                                if(cell.state == undefined){
                                    setMyStep(false);
                                    setSteps(steps + 1);
                                    let arr = field.map((el) => {
                                        if(el == cell){
                                            return {state:"○", id: el.id};
                                        }
                                        else{
                                            return el;
                                        }
                                    })
                                    setField(arr);
                                }
                            }
                        }}>
                            {cell.state}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, app);