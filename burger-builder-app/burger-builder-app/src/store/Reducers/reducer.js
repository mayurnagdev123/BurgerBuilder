import * as actionTypes from '../actions'
const initialState={
    ingredients:{
        cheese:0,        
        salad:0,
        bacon:0,
        meat:0
        },
        totalPrice:10 //for the buns
}
const actualPrices={
    cheese:20,
    salad:10,
    bacon:30,
    meat:35       
   }


const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+actualPrices[action.ingredientName]
            }   
          case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-actualPrices[action.ingredientName]
            }  

    }
    return state;
}
export default reducer;