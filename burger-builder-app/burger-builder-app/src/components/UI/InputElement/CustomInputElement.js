import React from 'react'
import classes from './InputElement.css'

const customInputElement = (props) => {
let inputElementSelected=null;

switch (props.inputtype)
{
    case('input'):
    inputElementSelected=<input {...props.properties} 
    value={props.value}
    className='form-control' 
    style={{border:'1.5px solid #703b09'}} 
    onChange={props.changed}/>
        break;
    case('textarea'):
    inputElementSelected=<textarea {...props.properties} className='form-control' onChange={props.changed}  />
    break;
    case ('select'):

        inputElementSelected=(
<select name="deliveryMethod" 
onChange={props.changed} className='form-control' style={{border:'1.5px solid #703b09'}}>
  <option value="fastest">Fastest</option>
  <option value="cheapest">Cheapest</option>

</select>
        );
        break;
    default:
        inputElementSelected=<input className='form-control' {...props.properties} />
}

return(
    <div className='form-group'>
        {inputElementSelected}
    </div>
);


}
export default customInputElement;