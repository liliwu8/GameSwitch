import { Link } from 'react-router-dom'

function FourOFour() {
  return (
    <div>
      <img
        src='https://media3.giphy.com/media/8gWzY7qwqguqVf7Nhz/giphy.gif?cid=6c09b952srlwvdiqrf496ipe6c24h3g170aykzi7aja7olrt'
        alt='error-pic'
      />
      <br />
      <Link to='/'>
        <button>Go Back</button>
      </Link>
      <br />
      <br/>
    </div>
  )
}

export default FourOFour
