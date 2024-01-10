import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

import style from "./style.module.css";

let app = document.getElementById("app");

function App(){

    let [field, setField] = useState([
        {state:undefined, id:1, color: "#252428"}, {state:undefined, id:2, color: "#252428"}, {state:undefined, id:3, color: "#252428"},
        {state:undefined, id:4, color: "#252428"}, {state:undefined, id:5, color: "#252428"}, {state:undefined, id:6, color: "#252428"},
        {state:undefined, id:7, color: "#252428"}, {state:undefined, id:8, color: "#252428"}, {state:undefined, id:9, color: "#252428"}
    ]);

    let [steps, setSteps] = useState(0);

    let [myStep, setMyStep] = useState(true);

    let [isCheck, setIsCheck] = useState(false);

    let [isEnd, setIsEnd] = useState(false);

    let [txt, setTxt] = useState("");

    function intelligence(a,b,c){
        if((field[a].state == field[b].state) && (field[a].state !== undefined) && (field[c].state == undefined)){
            return c;
        }
        else{
            return undefined;
        }
    }

    function check(){
        let maybe;
        if(intelligence(0,1,2) !== undefined){
            maybe = 2;
        }
        else if(intelligence(0,2,1) !== undefined){
            maybe = 1;
        }
        else if(intelligence(1,2,0) !== undefined){
            maybe = 0;
        }
        else if(intelligence(3,4,5) !== undefined){
            maybe = 5;
        }
        else if(intelligence(3,5,4) !== undefined){
            maybe = 4;
        }
        else if(intelligence(4,5,3) !== undefined){
            maybe = 3;
        }
        else if(intelligence(6,7,8) !== undefined){
            maybe = 8;
        }
        else if(intelligence(6,8,7) !== undefined){
            maybe = 7;
        }
        else if(intelligence(7,8,6) !== undefined){
            maybe = 6;
        }
        else if(intelligence(0,3,6) !== undefined){
            maybe = 6;
        }
        else if(intelligence(0,6,3) !== undefined){
            maybe = 3;
        }
        else if(intelligence(3,6,0) !== undefined){
            maybe = 0;
        }
        else if(intelligence(1,4,7) !== undefined){
            maybe = 7;
        }
        else if(intelligence(1,7,4) !== undefined){
            maybe = 4;
        }
        else if(intelligence(4,7,1) !== undefined){
            maybe = 1;
        }
        else if(intelligence(2,5,8) !== undefined){
            maybe = 8;
        }
        else if(intelligence(2,8,5) !== undefined){
            maybe = 5;
        }
        else if(intelligence(5,8,2) !== undefined){
            maybe = 2;
        }
        else if(intelligence(0,4,8) !== undefined){
            maybe = 8;
        }
        else if(intelligence(0,8,4) !== undefined){
            maybe = 4;
        }
        else if(intelligence(4,8,0) !== undefined){
            maybe = 0;
        }
        else if(intelligence(2,4,6) !== undefined){
            maybe = 6;
        }
        else if(intelligence(2,6,4) !== undefined){
            maybe = 4;
        }
        else if(intelligence(4,6,2) !== undefined){
            maybe = 2;
        }
        return maybe;
    }

    function pc(){
        let id = check();
        console.log("id: ", id);
        if(id == undefined){
            id = Math.round(Math.random() * 8);
        }
        if(field[id].state == undefined){
            let arr = field.map((el) => {
                if(el == field[id]){
                    return {state:"x", id: el.id, color: "#252428"}
                }
                else{
                    return el;
                }
            })
            setField(arr);
            setSteps(steps+1);
        }
        else{
            pc();
        }
        setMyStep(true);
    }

    function win(f, s, t){
        if((field[f].state == field[s].state) && (field[f].state == field[t].state) && (field[s].state == field[t].state) && (field[f].state !== undefined)){
            if(field[f].state == "○"){
                setTxt("You win!");
                setField(field.map((el) => {
                    if((el.id == f+1) || (el.id == s+1) || (el.id == t+1)){
                        return {state: el.state, id: el.id, color: "lime"}
                    }
                    else{
                        return el;
                    }
                }))
            }
            else if(field[f].state == "x"){
                setTxt("You lose!");
                setField(field.map((el) => {
                    if((el.id == f+1) || (el.id == s+1) || (el.id == t+1)){
                        return {state: el.state, id: el.id, color: "red"}
                    }
                    else{
                        return el;
                    }
                }))
            }
            setIsEnd(true);
        }
    }

    useEffect(() => {
        win(0,1,2);
        win(3,4,5);
        win(6,7,8);
        win(0,3,6);
        win(1,4,7);
        win(2,5,8);
        win(0,4,8);
        win(2,4,6);
        setIsCheck(!isCheck);
    }, [myStep])

    useEffect(() => {
        console.log("steps: ", steps);
        if((!isEnd) && (!myStep) && (steps < 9)){
            setTimeout(pc, 500);
        }
    }, [isCheck])

    useEffect(() => {
        if(steps == 9){
            setIsEnd(true);
        }
    }, [steps])

    useEffect(() => {
        if(isEnd){
            setTimeout(() => {document.location.reload()}, 2000)
        }
    }, [isEnd])

    return(
        <div className={style.outside}>
        <h1>Tic-Tac-Toe</h1>
            <div className={style.field}>
                {field.map((cell) => (
                    <div style={{backgroundColor: `${cell.color}`}} key={cell.id} className={style.cell} onClick={() => {
                        if(!isEnd){
                            if(myStep){
                                if(cell.state == undefined){
                                    let arr = field.map((el) => {
                                        if(el == cell){
                                            return {state:"○", id: el.id, color: el.color};
                                        }
                                        else{
                                            return el;
                                        }
                                    })
                                    setField(arr);
                                    setMyStep(false);
                                    setSteps(steps+1);
                                }
                            }
                        }   
                    }}>
                        {cell.state}
                    </div>
                ))}
            </div>
            {txt == "You lose!" ? <h1 style={{backgroundColor: "red"}}>{txt}</h1> : txt == "You win!" ? <h1 style={{backgroundColor: "lime"}}>{txt}</h1> : steps == 9 ? <h1 style={{backgroundColor: "blue"}}>Draw</h1> : ""}
        </div>
    )
}

ReactDOM.render(<App/>, app);