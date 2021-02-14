import React from 'react'
import BuildControl from "./BuildControl/BuildControl"
import classes from "./BuildControls.css"
const controls=[
    {label:'Cheese',type:'cheese'},
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
  ];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
     
<p>Current Price: <strong>{props.price}</strong></p>
{ 
controls.map(control=>(
<BuildControl 
key={control.label} 
Label={control.label}
addIngredient={() => props.addIngredients(control.type)}
removeIngredient={() => props.removeIngredients(control.type)}
disabled={props.disabled[control.type]}
/>
))
}
<button className={classes.OrderButton}
disabled={!(props.price>10)}
onClick={props.clicked}>ORDER NOW</button>
    </div>
);

export default buildControls;