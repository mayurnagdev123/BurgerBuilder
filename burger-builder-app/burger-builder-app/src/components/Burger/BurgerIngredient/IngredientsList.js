import React from 'react'
import BurgerIngredient from './BurgerIngredient';

class IngredientsList extends React.Component{

render(){
return(
this.props.ingredients.map((ingredient,index) => {

return <BurgerIngredient type={ingredient} key={ingredient+index}/>

}));


}}
export default IngredientsList;