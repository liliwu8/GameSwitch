import axios from 'axios'
import { useState, useEffect } from 'react'
import { Card, Container, Row, Form } from 'react-bootstrap'
import './Users.css'
import { Link } from 'react-router-dom'
const API = process.env.REACT_APP_API_URL

function Users() {
  const [users, setUsers] = useState([])
  //const [location, setLocation] = useState('All Locations');
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        setUsers(res.data.payload)
        setSelectedUsers(res.data.payload)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const getUsersByLocation = (users, location) => {
    if (location === 'All Locations') {
      setSelectedUsers([...users])
    } else {
      let filteredUsers = users.filter((user) => {
        return user.user_location === location
      })
      setSelectedUsers(filteredUsers)
    }
  }

  const allUsers = selectedUsers.map((user, idx) => {
    return (
      <Card className='usercard' key={idx} style={{ width: '15rem' }}>
        <Card.Title>{user.user_name}</Card.Title>
        <Link to={`/users/${user.user_email}`}>
          <Card.Img
            className='userImage'
            src={user.user_avatar}
            alt={user.user_name}
          />
        </Link>
      </Card>
    )
  })


  return (
    <div>
      <Form.Select
        id='dropdown-userLocation'
        onChange={(e) => {
          getUsersByLocation(users, e.target.value)
        }}
      >
        <option value={'All Locations'}>All Locations</option>
        <option value={'Brooklyn'}>Brooklyn</option>
        <option value={'Manhattan'}>Manhattan</option>
        <option value={'Bronx'}>Bronx</option>
        <option value={'Staten Island'}>Staten Island</option>
        <option value={'Queens'}>Queens</option>
      </Form.Select>
      <Container>
        <Row id='userrow'>{allUsers}</Row>
      </Container>
    </div>
  )
}

export default Users
