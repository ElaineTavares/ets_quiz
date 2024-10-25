import PropTypes from 'prop-types';

import './Button.css'


export default function Button({children}) {
  return (
    <div className="button_container">
        <button className='button'>{children}</button>
    </div>
    
  )
}


Button.propTypes = {
    children: PropTypes.node.isRequired, // Valida que 'children' é passado e é um nó React   
  };