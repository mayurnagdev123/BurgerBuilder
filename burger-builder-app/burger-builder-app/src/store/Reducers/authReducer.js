import * as actionTypes from '../actions'

const initialState={
    error:null,
    loading:false,
    idToken:null,
    userId:null
}
const authReducer= (state=initialState, action) =>{
    switch(action.type)
    {
case (actionTypes.AUTH_START):
    return {
        ...state,
        loading:true,
        error: null
    }
    case(actionTypes.AUTH_SUCCESS):
    return{
        ...state,
        loading:false,
        error:null,
        userId:action.userId,
        idToken:action.idToken
    }
    case(actionTypes.AUTH_FAIL):
    return{
        ...state,
        loading:false,
        error:action.error
    }
    case(actionTypes.AUTH_LOGOUT):
    return{
        ...state,
        idToken:null,
        userId:null
    }
    default : 
    return state;
    }
}


export default authReducer;