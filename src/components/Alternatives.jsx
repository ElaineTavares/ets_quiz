import './Alternatives.css'
import PropTypes from 'prop-types';

export default function Alternatives({alternative, order, ticar, ticado}) {
  return (
    <label className='label' onClick={ticar}>    
      <div className='label_div'> 
      <input             
        className='input'
        type="radio" 
        id={`alternative-${order}`} 
        name='alternative' 
        value={order}
        checked={ticado}
        onChange={ticar}
      />            
          {alternative}        
      </div>                
    </label>
  )
}


Alternatives.propTypes = {
    alternative: PropTypes.node.isRequired, // Valida que 'children' é passado e é um nó React
    order: PropTypes.node.isRequired, // Valida que 'headerTitle' é passado e é um nó React
    ticar: PropTypes.node.isRequired, // Valida que 'headerTitle' é passado e é um nó React
    ticado: PropTypes.node.isRequired, // Valida que 'headerTitle' é passado e é um nó React
  };
