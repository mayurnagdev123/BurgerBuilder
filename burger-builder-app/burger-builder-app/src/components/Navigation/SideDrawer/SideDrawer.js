import React from 'react'
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from "./SideDrawer.css"
import Auxiliary from "../../../hoc/_Aux/_Aux"
import Backdrop from "../../UI/Backdrop/Backdrop"
class SideDrawer extends React.Component{

    componentDidMount(){
        console.log("[Sidedrawer]componentDidMount!");
    }
    componentDidUpdate()
    {
        console.log("[Sidedrawer]componentDidUpdate");
    }
    render(){
        console.log("[Sidedrawer]render");
        let attachedClasses=[classes.SideDrawer,classes.Close];
        if(this.props.isVisible)
        attachedClasses=[classes.SideDrawer,classes.Open];
        return (
            <Auxiliary>
                <Backdrop isVisible={this.props.isVisible} clicked={this.props.clicked} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                <Logo />
                </div>
                   <nav>
                <NavigationItems {...this.props}/>
                </nav>
            </div>
            </Auxiliary>
        );

    }
// const sideDrawer = (props) => {
   

//}
}

export default SideDrawer;