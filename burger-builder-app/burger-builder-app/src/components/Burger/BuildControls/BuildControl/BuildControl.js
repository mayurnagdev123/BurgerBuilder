import React from 'react'
import classes from "./BuildControl.css"

const buildControl = (props) => (
   
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.Label}</div>
        <button className={classes.Less} onClick={props.removeIngredient} 
        disabled={props.disabled}>-</button>
        <button className={classes.More} onClick={props.addIngredient} >+</button>
       
    </div>
);

export default buildControl;