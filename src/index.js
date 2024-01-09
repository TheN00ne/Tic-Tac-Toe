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

    let [isEnd, setIsEnd] = useState(false);

    let [txt, setTxt] = useState("");

    function pc(){
            if((!myStep) && (steps < 9)){
                if(!isEnd){
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
    }

    function win(f, s, t){
        if((field[f].state == field[s].state) && (field[f].state == field[t].state) && (field[s].state == field[t].state) && (field[f].state !== undefined)){
            if(field[f].state == "○"){
                setTxt("You win!");
                setSteps(9);
                setIsEnd(true);
            }
            else if(field[f].state == "x"){
                setTxt("You lose!");
                setSteps(9);
                setIsEnd(true);
            }
        }
    }

    function check(){
        win(0,1,2)
        win(3,4,5)
        win(6,7,8)
        win(0,3,6)
        win(1,4,7)
        win(2,5,8)
        win(0,4,8)
        win(2,4,6)
    }

    useEffect(() => {
        check();
        setTimeout(pc, 500);
    }, [myStep])

    useEffect(() => {
        console.log(steps);
        if(!isEnd){
            if(steps == 9){
                setMyStep(undefined);
            }
        }
    }, [steps])

    return(
        <div>
            <h1>Tic-Tac-Toe</h1>
            <div className={style.outside}>
                <div className={style.field}>
                    {field.map((cell) => (
                        <div key={cell.id} className={style.cell} onClick={() => {
                            if(!isEnd){
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
                                        check();
                                        setField(arr);
                                    }
                                }   
                            }
                        }}>
                            {cell.state}
                        </div>
                    ))}
                </div>
                <h1>{txt}</h1>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, app);