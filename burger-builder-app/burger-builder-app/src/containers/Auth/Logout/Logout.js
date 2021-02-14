import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/authActions'
import {Redirect} from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner'
class Logout extends React.Component{
    state={
        loading:true
    }

    componentDidMount(){
        setTimeout(()=> {
            this.setState({loading:false})
        } , 500);
        this.props.onLogout();

    }
    render(){

        return(
            <div>
                <h2 style={{textAlign:'center'}}>Please wait till you are redirected</h2>
              {this.state.loading ? <Spinner /> : <Redirect to="/" />}  
            </div>
        );
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onLogout: ()=> {
            dispatch(actions.logout());
            
        }

    }
}
export default connect(null,mapDispatchToProps)(Logout);