import React from 'react'
import classes from './InputElement.css'

const inputElement = (props) => {
let inputElementSelected=null;

switch (props.inputtype)
{
    case('input'):
    inputElementSelected=<input {...props} className='form-control' style={{border:'1.5px solid #703b09'}} required="true"/>
        break;
    case('textarea'):
    inputElementSelected=<textarea {...props} className='form-control' />
    break;
    case ('select'):

        inputElementSelected=(
<select name="deliveryMethod" id="deliveryMethod" className='form-control' style={{border:'1.5px solid #703b09'}}>
  <option value="fastest">Fastest</option>
  <option value="cheapest">Cheapest</option>

</select>
        );
        break;
    default:
        inputElementSelected=<input className='form-control' />
}

return(
    <div className='form-group'>
        {inputElementSelected}
    </div>
);


}
export default inputElement;