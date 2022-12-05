import { useState, useEffect, useContext, useRef } from "react";
import Plots from './plot'
import classes from "./results.module.css";

function Results () {
    return <div className={classes.allplots}>
        <Plots idextra = {0}/>
        <Plots idextra = {1}/>
    </div>
}


export default Results