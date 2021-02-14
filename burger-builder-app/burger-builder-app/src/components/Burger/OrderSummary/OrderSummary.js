import React from 'react'
import Auxiliary from '../../../hoc/_Aux/_Aux'
import Button from "../../UI/Button/Button"
const orderSummary = (props) =>{
    const ingredients={...props.ingredients};
    var finalItems=[];
    for (var i in ingredients)
    {
var tmp=<li key={i}>{i}: <span>{ingredients[i]}</span></li>;
finalItems.push(tmp);
    }

 return(
     <Auxiliary>
         <h3>Your Order</h3>
<p>A delicious burger with following ingredients:</p>
<ul>
    {finalItems}
</ul>
<p><strong>Total Price : {props.totalPrice}</strong></p>
<p>Continue to Checkout?</p>
<Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
<Button btnType="Success" clicked={props.continueCheckout}>CHECKOUT</Button>
     </Auxiliary>
 )

}
export default orderSummary