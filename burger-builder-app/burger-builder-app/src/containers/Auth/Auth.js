import React from 'react'
import Button from '../../components/UI/Button/Button'
import CustomInputElement from '../../components/UI/InputElement/CustomInputElement'
import classes from './auth.css'
import * as actions from '../../store/authActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Spinner from  '../../components/UI/Spinner/Spinner'

class Auth extends React.Component{
state={
    controls:{
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
        password:{
            inputtype:'input',
            properties:{
                type : 'password',
                placeholder : 'password',
                required : true
            },
            value:'',
            validation : {
                required : true
            }
        }
    },
    isSignUp:true
}//state

inputChangedHandler(event,elementKey)
{
    const controls = {...this.state.controls};
    controls[elementKey].value=event.target.value;
    this.setState({
        controls : controls
    })

}
authenticateHandler = (event) =>{
    event.preventDefault();
    this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignUp
        )
}

switchSignInMode = () =>{

    this.setState((prevState) => {
        return {
isSignUp : !prevState.isSignUp,


        }
    });

}

render(){


//copying from Customerdata
let elementConfigArray=[];
for(let control in this.state.controls)
{

    elementConfigArray.push({
        key:control,
        control: control,
        config: this.state.controls[control]
    })
 
}
let formElements=[];

elementConfigArray.map((elementConfig) => {

formElements.push(
    <CustomInputElement 
    value={elementConfig.config.value}
    key={elementConfig.control}
    inputtype={elementConfig.config.inputtype}
    properties={elementConfig.config.properties} 
    changed={(event) => this.inputChangedHandler(event,elementConfig.control)}/>
);

});
 formElements.push(<button className='btn btn-block btn-success' key='authSubmit' >{this.state.isSignUp? 'SIGN UP' : 'SIGN IN' }</button>);
console.log("[Auth.js]",elementConfigArray);
var form=(
    <form style={{fontSize:'inherit'}} className="form-group" onSubmit={this.authenticateHandler}>
        <h3 style={{padding:'20px'}}>{this.state.isSignUp? 'You must Sign Up first' : 'Login' }</h3>
        {formElements}      
<hr style={{height:'2px',backgroundColor:'#703b09'}}/>
<h4>{this.state.isSignUp ? 'Existing User ?' : 'New User ?'}</h4><p className='btn btn-block btn-danger' onClick={this.switchSignInMode} >{this.state.isSignUp ?  'SIGN IN' : 'SIGN UP' }</p>


</form>
);

if(this.props.loading)
form=<Spinner />
let errorMessage = null;
if(this.props.error)
{
    errorMessage=<p style={{fontWeight:'bold',color:'#f44336'}}>{this.props.error.response.data.error.message}</p>
}
let redirectTo=null;
if(this.props.idToken !=null && this.props.userId != null) //user is authenticated
{
    if(this.props.global_totalPrice >10)
    redirectTo = <Redirect to = "/checkout" />
    else
    redirectTo=<Redirect to ="/" />

}

    return(
        <div className={classes.auth}>
            {redirectTo}
            {errorMessage}
            {form}
          
            

   
        </div>
    );

}

}//class
const mapStateToProps = state=>{
    return{
        loading:state.authReducer.loading,
        error:state.authReducer.error,
        idToken : state.authReducer.idToken,
        userId : state.authReducer.userId,
        global_totalPrice : state.burgerReducer.totalPrice
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignUp) =>{
            dispatch(actions.auth(email,password,isSignUp));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);