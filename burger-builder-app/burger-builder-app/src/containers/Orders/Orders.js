import React from 'react'
import axios from '../../axios-orders'
import OrderPage from '../../components/Order/OrderPage/OrderPage'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
class Orders extends React.Component{
state={
    orders:[],
    loading:true
}
componentDidMount(){
    if(this.props.userId != null && this.props.idToken!=null )
    {
    let fetched_orders=[];

    const queryParams = '?auth='+this.props.idToken+'&orderBy="userId"&equalTo="'+this.props.userId+'"';


    axios.get('/orders.json'+queryParams).
then(response => {

for(let key in response.data)
{

    fetched_orders.push(response.data[key]);
}
this.setState({loading:false});
}).
catch(error => {
console.log("[Orders.js]", "an error occured",error);
this.setState({loading:false});
});
this.setState({orders:fetched_orders});
    }
}//componentDidMount
    render(){
        console.log("[Orders.js]",this.props.idToken,"---",this.props.userId);
       if(this.props.idToken == null && this.props.userId == null)
       {
        return (<Redirect to ="/authenticate" />);
       }


        let orders_array=[];
        
let SpinnerOrData;
if(this.state.loading)
SpinnerOrData=<Spinner />;
else
{
SpinnerOrData=<h1 style={{textAlign:'center'}}>Your Orders</h1>;
console.log("[Orders.js]","orders array",this.state.orders);
for(var index in this.state.orders)
{


    orders_array.push(<
        OrderPage 
        id={index}
        key={index}
        ingredients={this.state.orders[index].ingredients} 
        deliveryMethod={this.state.orders[index].orderDetails.deliveryMethod}
        address={this.state.orders[index].orderDetails.street+"\t,"+
        this.state.orders[index].orderDetails.city+"\t,"+
        this.state.orders[index].orderDetails.zipCode}
        price={this.state.orders[index].price}
        />);
}
}//else

        return(
            <div>
               {SpinnerOrData}
               {orders_array}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        idToken: state.authReducer.idToken,
        userId : state.authReducer.userId
   }
 }

export default connect(mapStateToProps)(withErrorHandler(Orders,axios));