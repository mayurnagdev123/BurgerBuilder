import * as actionTypes from './actions'
import axios from 'axios'

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken,userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
}

export const authFail = (error) =>{
  
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('willExpireOnDate');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) =>{

return dispatch =>{
    setTimeout(()=>{
        dispatch(logout());
    },expirationTime*1000); //setTimeout(()=>{something},700) this executes after 700 milliseconds.
}

}

export const checkIfAuthenticated = () =>{

return dispatch=>{
    const idToken=localStorage.getItem("idToken");
    if(idToken == null)
    {
        console.log("[CheckIfAuthenticated]","idToken is null..dispatching logout");
    dispatch(logout());
    } 
    else{
        const expirationTime=localStorage.getItem("expiresIn");

        const userId=localStorage.getItem("userId");
        const willExpireOnDate=localStorage.getItem('willExpireOnDate');
        let willExpireOnDate_DATE= new Date(willExpireOnDate);
        
        console.log("[[CheckIfAuthenticated]",willExpireOnDate,"---",new Date(),"---",willExpireOnDate_DATE > new Date());
        if(willExpireOnDate_DATE > new Date())//there is still time left before the user should be logged out
        {
            dispatch(authSuccess(idToken,userId));
            const expirationTimeInSeconds=(willExpireOnDate_DATE.getTime()-new Date().getTime())/1000;
            console.log("expirationTimeInSeconds upon page refresh",expirationTimeInSeconds)
            dispatch(checkAuthTimeout(expirationTimeInSeconds));
        }
        else
        {
            console.log("[CheckIfAuthenticated]","token expired");
            dispatch(logout());//token expired..logout
        }
      
    }//idToken exists
}
}


export const auth = (email,password, isSignUp) =>{

    return dispatch=>{ //thunk provides us this dispatch object

const authData={
    email: email,
    password:password,
    returnSecureToken:true
}
//URL to be used for default sign up case
    let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChH_ojJyFFjPEEfO8Z7XvRtjiu8JXPg0Y';
    if(!isSignUp)
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChH_ojJyFFjPEEfO8Z7XvRtjiu8JXPg0Y'; //SignIn URL
            dispatch(authStart());
            axios.post(url,authData).
            then(response=>{
                console.log("[AuthActions] Authentication success", response);

               const expiryDate = new Date(response.data.expiresIn * 1000 + new Date().getTime()); 

                localStorage.setItem('idToken',response.data.idToken);
                localStorage.setItem('userId',response.data.localId);
               
                localStorage.setItem('willExpireOnDate',expiryDate);
                const expirationTimeInSeconds=(expiryDate.getTime()-new Date().getTime())/1000;

                localStorage.setItem('expiresIn',expirationTimeInSeconds);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(expirationTimeInSeconds));
            }).
            catch(error=>{
                console.log("[AuthActions] Authentication Failed","error is----",error);
                dispatch(authFail(error));
            })
        
    }
}