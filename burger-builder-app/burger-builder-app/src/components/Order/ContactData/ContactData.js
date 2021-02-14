import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios_order_instance from '../../../axios-orders'
import { withRouter } from 'react-router-dom'
import Spinner from "../../UI/Spinner/Spinner"
import InputElement from '../../UI/InputElement/InputElement'
class ContactData extends React.Component
{
state={
    loading:false,
    deliveryMethod:'initial'
}
componentDidMount(){
    console.log("[ContactData] componentDidMount",this.props);
}
placeOrderHandler = (e) =>{
e.preventDefault();
this.setState({
    deliveryMethod:'mayur',
    loading:true
}, () => {
console.log("state updation complete",this.state.deliveryMethod);
    });


const customerDetails ={
        name:document.getElementById('name').value,
        address : {
            street :document.getElementById('street').value,
            city: document.getElementById('city').value,
            zipcode : document.getElementById('zipcode').value,
    
        },
        email : document.getElementById('email').value
    }



this.setState({loading:true})

    const orders= {
         ingredients : this.props.ingredients,
         price : this.props.totalPrice,
         orderDetails:{
            customer :customerDetails,
            deliveryMethod: document.getElementById('deliveryMethod').value
         },
        
    }
    console.log("[ContactData.js]","Placing order");
    axios_order_instance.post('/orders.json',orders)
    .then(response => {
console.log("data saved!",response);
 this.setState({
 loading : false
 })
this.props.history.replace("/orders");
    })
    .catch(error =>{
     console.log("an error occured",error);
  this.setState({
         loading : false
     });  
    });

}
render(){
    var form=(
        <form style={{fontSize:'inherit'}} className="form-group" onSubmit={this.placeOrderHandler}>
        <InputElement id="name" inputtype="input" type="text" name="name" placeholder="name" /><br/>
        <InputElement id="email" inputtype="input" type="email" name="email" placeholder="email" /><br/>
        <InputElement id="street" inputtype="input" type="text" name="street" placeholder="street" /><br/>
        <InputElement id="city" inputtype="input" type="text" name="city" placeholder="city" /><br/>
        <InputElement id="zipcode" inputtype="input" type="number" name="zipcode" placeholder="zipCode" /><br/>
        <InputElement id="deliveryMethod" inputtype="select" /><br/>
    <Button btnType="Success" >ORDER</Button>
    </form>
    );
    if(this.state.loading)
    {
        form=(<Spinner />);
    }
return(
    <div className={classes.contactData} >
        <h3>Enter your contact details</h3><br />
       {form}

    </div>
);

}
}//class
export default withRouter(ContactData);