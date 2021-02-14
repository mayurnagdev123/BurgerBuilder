import React from 'react'
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
import Auxiliary from '../../../hoc/_Aux/_Aux'
class Modal extends React.Component{

    shouldComponentUpdate(nextProps,nextState)
    {
        console.log("[Modal.js current props: ", this.props.isVisible);
        

        if(this.props.isVisible !== nextProps.isVisible || nextProps.children !== this.props.children)
        return true;
        else
        return false;
    }
    componentDidUpdate(){
        console.log("Modal did update!");
    }
    render(){
        return(
        <Auxiliary>
            <Backdrop isVisible={this.props.isVisible} 
            clicked={this.props.cancelOrder}
            />
            <div className={classes.Modal}
            style={{
                transform : this.props.isVisible ? 'translateY(0)' : 'translateY(-10vh)' ,
                    opacity: this.props.isVisible ? '1' : '0' ,
                    display: this.props.isVisible ? 'block' : 'none' 

              
            }}
            >

                {this.props.children}
            </div>
            </Auxiliary>
            );
        }
    }

export default Modal;