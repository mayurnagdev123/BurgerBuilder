import React from 'react'
import AuxiliaryComponent from "../../hoc/_Aux/_Aux"
import classes from "./Layout.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import { render } from 'react-dom'
import {connect} from 'react-redux'
class Layout extends React.Component {

    componentDidMount(){

    }
    componentDidUpdate()
    {

    }
    state={
        showSidebarDrawer:false
    }
sidebarDrawerClosedHandler = () => {
    this.setState({
        showSidebarDrawer:false
    })
}
toggleSidedDrawerHandler = () =>{
  this.setState((prevState) => {
return{
showSidebarDrawer : !prevState.showSidebarDrawer
};
  });
}

    render(){
return(
    <AuxiliaryComponent>
        <Toolbar clicked={this.toggleSidedDrawerHandler}
         userId={this.props.userId}
         idToken={this.props.idToken} />
        <SideDrawer 
         userId={this.props.userId}
         idToken={this.props.idToken} 
        isVisible={this.state.showSidebarDrawer} 
         clicked={this.sidebarDrawerClosedHandler}/>
 <main className={classes.content}>
    {this.props.children} 
</main>
</AuxiliaryComponent>
)};
}
const mapStateToProps = state=>{
    return{
        idToken: state.authReducer.idToken,
        userId : state.authReducer.userId
    }
}
export default connect(mapStateToProps)(Layout);