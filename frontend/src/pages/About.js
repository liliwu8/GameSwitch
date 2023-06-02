import './About.css'
import { Card} from 'react-bootstrap'
import github from './GitHub_Logo.png'
import linkedIn from './linked.png'

function About() {
  return (
    <div className='about-page'>
      <br></br>
      <h1 className='about-font'>About Me</h1>
        <Card className='biocard'>
          <Card.Img
            variant='top'
            src='https://i.imgur.com/mFmfhHL_d.jpg?maxwidth=520&shape=thumb&fidelity=high'
            className='about-img'
          />
          <Card.Body>
            <Card.Title>Li Li Wu</Card.Title>
            <Card.Text>
              I am fullstack software engineer in NYC with a Bachelor of
              Business Administration in Marketing. I have a background in
              logistics/ importing. I like to code and create websites. When I
              am not coding, I like to binge on series and try new foods!
            </Card.Text>
            <Card.Footer>
              <a href='https://github.com/liliwu8'>
                <Card.Img
                  alt='GitHub'
                  title='GitHub'
                  src={github}
                  style={{ width: '100px' }}
                />
              </a>
              <a href='https://www.linkedin.com/in/li-li-w-83831984/'>
                <Card.Img
                  alt='LinkedIn'
                  title='LinkedIn'
                  src={linkedIn}
                  style={{ width: '100px' }}
                />
              </a>
            </Card.Footer>
          </Card.Body>
        </Card>
    </div>
  )
}

export default About
