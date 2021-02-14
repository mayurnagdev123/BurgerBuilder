import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    console.log("[Burger.js]",props);
    //mayur's code
    var ingredientsArray=props.ingredients;
    let transformedIngredients=[];
    for(var ingredient in ingredientsArray)
    {

var quantity=ingredientsArray[ingredient];
for(var i=0;i<quantity;i++)
{
   transformedIngredients.push(<BurgerIngredient type={ingredient} key={ingredient+i} />);  
}

   }//for-each
    console.log("[Burger.js]",transformedIngredients);
    if(transformedIngredients.length ==0)
    transformedIngredients=<p>Please start adding ingredients!</p>
    
    return (
        <div className={classes.burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;