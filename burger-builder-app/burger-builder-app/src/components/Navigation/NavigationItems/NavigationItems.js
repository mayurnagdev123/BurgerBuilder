import React from 'react'
import NavigationItem from "./NavigationItem/NavigationItem"
import classes from "./NavigationItems.css"
const navigationItems = (props) =>
{
  console.log("[NavigationItems]",props);
  let authenticateOrLogout =  <NavigationItem link="/authenticate">Authenticate</NavigationItem>;
  if(props.userId && props.idToken)
  authenticateOrLogout= <NavigationItem link="/logout">Logout</NavigationItem>
return(
 <ul className={classes.UnorderedList}>
  <NavigationItem link="/" exact>Burger Controls</NavigationItem>
  <NavigationItem link="/orders">Orders</NavigationItem>
  {authenticateOrLogout}
  </ul>
);

}  



export default navigationItems;