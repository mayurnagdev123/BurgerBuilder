import React from 'react'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.css'
import Button from '../../UI/Button/Button'
import {withRouter} from 'react-router-dom'
const checkoutSummary = (props) =>{
return(
    <div className={classes.checkoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width:'100%',margin:'auto'}} >
    <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType='Danger' clicked={() => props.history.goBack()}>Cancel</Button>
    <Button btnType='Success'clicked={() => props.history.replace('/checkout/contact-data')}>Continue</Button>
    </div>
);
}
export default withRouter(checkoutSummary);