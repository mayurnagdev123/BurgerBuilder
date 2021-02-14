import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from '../src/containers/Auth/Logout/Logout'
import * as actions from '../src/store/authActions'
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount(){
this.props.onRefreshPage();
  }
  render () {
    console.log("[App.js]","Coded by mayurnagdev123");
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/authenticate" component={Auth} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/*" render={()=> (<h2 style={{textAlign:'center'}}>Page not found :(</h2>)} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onRefreshPage : () =>{
      dispatch(actions.checkIfAuthenticated());
    }
  }
}

export default connect(null,mapDispatchToProps)(App);
