import React , { Component } from 'react'
import AuxiliaryComponent from '../../hoc/_Aux/_Aux'
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal.js"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios_order_instance from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import {Route,Redirect} from 'react-router-dom'
import Checkout from '../Checkout/Checkout'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions'



class BurgerBuilder extends Component{
    componentDidUpdate(){
        console.log("[BurgerBuilder]ComponentDidUpdate");
    }

    state={
        orderNowClicked:false,
        loading:false,
        checkoutContinued:false 
    }
    componentDidMount(){
        console.log("[BurgerBuilder]ComponentDidMount");
    }
    orderNowClickedHandler = () =>{
        if(this.props.idToken !=null && this.props.userId != null)//user is authenticated
        {
            this.setState({
                orderNowClicked : true  
            })
        }
        else{
            this.props.history.push("/authenticate");
        }


    }
    cancelOrderNowHandler = () =>{
        this.setState({
            orderNowClicked : false
        })
    }

    continueCheckoutHandler = () =>{

var queryParams=[];
for(var ing in this.props.global_ingredients)
{
    queryParams.push(encodeURIComponent(ing)
    +'='
    +encodeURIComponent(this.props.global_ingredients[ing]));
}
queryParams.push('Price='+this.props.global_totalPrice);
var queryString=queryParams.join("&");

this.props.history.push({
pathname:'/checkout'
//search:'?'+queryString //we no longer need this after we use redux
});
    
    }

render(){
    console.log("[BurgerBuilder]render called!");
 var disabledStates={...this.props.global_ingredients};

 for(var i in disabledStates)
 {

     if(disabledStates[i]==0)
     disabledStates[i]=true;
     else
     disabledStates[i]=false;
 }


 let showOrderSummaryOrSpinner;
 if(!this.state.loading)
 {

 showOrderSummaryOrSpinner=
 <OrderSummary ingredients={this.props.global_ingredients} 
 totalPrice={this.props.global_totalPrice}
 cancelOrder={this.cancelOrderNowHandler}
 continueCheckout={this.continueCheckoutHandler}/>;
 
 }
 else
 {

     showOrderSummaryOrSpinner=<Spinner />
 }
return (
    <AuxiliaryComponent>
        <Modal isVisible={this.state.orderNowClicked}  cancelOrder={this.cancelOrderNowHandler}>
{showOrderSummaryOrSpinner}
            </Modal>
        <Burger ingredients={this.props.global_ingredients}/>
        <BuildControls 
        addIngredients={this.props.onAddingIngredient}
        removeIngredients={this.props.onRemovingIngredient}
        disabled={disabledStates}
        clicked={this.orderNowClickedHandler}
        price={this.props.global_totalPrice}
        />
          {/* {this.state.checkoutContinued ? <Redirect to='/checkout' /> : null } */}
          
             
       
    </AuxiliaryComponent>

);

}}//class
const mapStateToProps =state =>{
    return{
        global_ingredients:state.burgerReducer.ingredients,
        global_totalPrice:state.burgerReducer.totalPrice,
        idToken:state.authReducer.idToken,
        userId:state.authReducer.userId
    }
}
const mapDispatchToProps =dispatch =>{
    return{
        onAddingIngredient:(ingredientToAdd)=>{
            dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingredientToAdd})
        },
        onRemovingIngredient:(ingredientToRemove)=>{
            dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingredientToRemove})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios_order_instance));