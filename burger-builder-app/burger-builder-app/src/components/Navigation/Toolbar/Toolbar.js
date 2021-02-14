import React from 'react'
import classes from "./Toolbar.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import DrawerToggler from "../SideDrawer/DrawerToggle/DrawerToggle"

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.clicked}/>
        <Logo />
        <nav>
        <NavigationItems {...props}/>
        </nav>
    </header>
);

export default toolbar;