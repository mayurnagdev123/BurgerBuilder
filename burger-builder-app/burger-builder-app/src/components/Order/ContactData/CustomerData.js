import React from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios_order_instance from '../../../axios-orders'
import { withRouter } from 'react-router-dom'
import Spinner from "../../UI/Spinner/Spinner"
import {connect} from 'react-redux'
import CustomInputElement from '../../UI/InputElement/CustomInputElement'
class CustomerData extends React.Component
{
state={
    orderForm:{
        name:{
            inputtype:'input',
            properties:{
                type : 'text',
                placeholder : 'name',
                required : true
            },
            value:'',
            validation : {
                required : true
            }

        },
        email:{
            inputtype:'input',
            properties:{
                type : 'email',
                placeholder : 'email',
                required : true
            },
            value:'',
            validation : {
                required : true
            }
        },
        street:{
            inputtype:'input',
            properties:{
                type : 'text',
                placeholder : 'street',
                required : true
            },
            value:'',
            validation : {
                required : true
            }
        },
        city:{
            inputtype:'input',
            properties:{
                type : 'text',
                placeholder : 'city',
                required : true
            },
            value:'',
            validation : {
                required : true
            }
        },
        zipCode:{
            inputtype:'input',
            properties:{
                type : 'number',
                placeholder : 'zipcode',
                required : true
            },
            value:'',
            validation : {
                required : true
            }
        },
        deliveryMethod:{
            inputtype:'select',
            value:'fastest',
            properties:{
                type: '',
                options :[
                    {
                        value : 'fastest' , displayValue: 'Fastest'
                    },
                    {
                        value : 'cheapest' , displayValue: 'Cheapest'
                    }
                ]

            },
            validation : {
                required : true
            }
        }
    },
    loading:false

}
componentDidMount(){

}
placeOrderHandler = (e) =>{
e.preventDefault();

this.setState(
    {loading:true}, () => {
console.log("state updation complete");
    });
    let formData={};
    for(let attr in this.state.orderForm)
    {

        formData[attr]=this.state.orderForm[attr].value;
    }
    const orders= {
         ingredients : this.props.global_ingredients,
         price : this.props.global_totalPrice,
         orderDetails:formData,
         userId: this.props.userId
        // deliveryMethod:
        
    }
    console.log("CustomerData.js]","Placing order");
    axios_order_instance.post('/orders.json?auth='+this.props.idToken,orders)
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
inputChangedHandler(event,elementKey)
{
    const orderForm = {...this.state.orderForm};
    orderForm[elementKey].value=event.target.value;
    this.setState({
        orderForm : orderForm
    })

}
render(){
    let elementConfigArray=[];
    for(let attribute in this.state.orderForm)
    {
        elementConfigArray.push({
            attribute: attribute,
            config: this.state.orderForm[attribute]
        })
     
    }
    let formElements=[];
    elementConfigArray.map((elementConfig) => {
    formElements.push(
        <CustomInputElement 
        key={elementConfig.attribute}
        inputtype={elementConfig.config.inputtype}
        properties={elementConfig.config.properties} 
        changed={(event) => this.inputChangedHandler(event,elementConfig.attribute)}/>
    );
 
});
formElements.push(<Button btnType="Success" key="customerFormBtn">ORDER</Button>);
    var form=(
        <form style={{fontSize:'inherit'}} className="form-group" onSubmit={this.placeOrderHandler}>
{formElements}
 
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

const mapStateToProps=state =>{
    return{
    global_ingredients:state.burgerReducer.ingredients,
    global_totalPrice:state.burgerReducer.totalPrice,
    idToken:state.authReducer.idToken,
    userId : state.authReducer.userId
}
}

export default connect(mapStateToProps)(withRouter(CustomerData));