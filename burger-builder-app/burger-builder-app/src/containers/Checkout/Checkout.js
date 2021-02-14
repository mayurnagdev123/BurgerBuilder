import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import { connect } from 'react-redux'
import ContactData from '../../components/Order/ContactData/ContactData'
import CustomerData from '../../components/Order/ContactData/CustomerData'
class Checkout extends React.Component{
state={
    ingredients:{
        cheese:1,
        salad:1,
        meat:1,
        bacon:1
    },
    totalPrice:0
}
/*
componentDidMount(){
    console.log("[Checkout.js]componentDidMount",this.props);
    const queryParams=new URLSearchParams(this.props.location.search);
    const ingredients_fetched={};
    let burgerPrice=0;
    console.log("[Checkout.js]",queryParams);
    for(var ing of queryParams.entries())
    {

      if(ing[0].localeCompare('Price')!=0)
        ingredients_fetched[ing[0]]=+ing[1];
        else{
        console.log("[Checkout.js","price found wont add");
        burgerPrice=+ing[1];
    }
}
    console.log(ingredients_fetched,this.state.ingredients);
    console.log("burger price",burgerPrice);
    this.setState({
        ingredients:ingredients_fetched,
        totalPrice:burgerPrice
    });
}*/
    render(){

        console.log('height='+window.screen.height+'\tinnerheight='+window.innerHeight+'innerWidth ='+window.innerWidth+'\twidth='+window.screen.width)

       return(
           <div>
<CheckoutSummary ingredients={this.props.global_ingredients}/>
  {/* <Route path='/checkout/contact-data' 
  render={() => (<ContactData ingredients={this.props.global_ingredients} totalPrice={this.props.global_totalPrice} />) } /> */}
{/* experimenting with FormSubmission */}
{/*this line below was used before redux*/}
{/* <Route path='/checkout/contact-data' 
  render={() => (<CustomerData ingredients={this.props.global_ingredients} totalPrice={this.props.global_totalPrice} />) } /> */}

<Route path='/checkout/contact-data' 
  component={CustomerData} />

  </div>
        );
      
    }
}
const mapStateToProps=state =>{
    return{
    global_ingredients:state.burgerReducer.ingredients,
    global_totalPrice:state.burgerReducer.totalPrice
}
}

export default connect(mapStateToProps)(Checkout);