import './Card.css'
import PropTypes from 'prop-types';

export default function Card({children, headerTitle, altura}) {
  return (
    <main className='main_card'>
        <div className='card' style={{height: altura}}>
            <header className='card_header'>
                <h1 className='card_header_title'>{headerTitle}</h1>
            </header>
            {children}
        </div>
    </main>
    
  )
}

Card.propTypes = {
    children: PropTypes.node.isRequired, // Valida que 'children' é passado e é um nó React
    headerTitle: PropTypes.node.isRequired, // Valida que 'headerTitle' é passado e é um nó React
    altura: PropTypes.node.isRequired, // Valida que 'headerTitle' é passado e é um nó React
  };