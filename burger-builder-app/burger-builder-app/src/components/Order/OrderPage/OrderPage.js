import React from 'react'
import classes from './OrderPage.css'
const orders = (props) => {
    console.log("OrderPage",props);
    const id=props.id;
    
    var ingredientsOutput=[];
   for(var index in props.ingredients)
   {
       console.log("index=",index,props.ingredients[index],"---id=",id);
        ingredientsOutput.push(<span 
            key={index+id}
            style={{
                padding:'3px',
                transform:'capitalize',
                display:'inline-block',
               
                }}
            >{index} : {props.ingredients[index]}
            </span>)
    }
return(
<div className={classes.Order}>
 
<h4>A scrumptious Burger with Ingredients:</h4>
<h4> (<strong>{ingredientsOutput}</strong>)</h4>
<h4>Will be delivered to: <strong>{props.address}</strong></h4>
<h4>in the <strong>{props.deliveryMethod}</strong> way possible :)</h4>
<h4>Please have a change of <strong>Rs {props.price}</strong> handy to avoid inconvenience </h4>

</div>
)}
export default orders;