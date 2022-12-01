import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Container, Row, Form } from 'react-bootstrap';
import './Users.css';
const API = process.env.REACT_APP_API_URL;

function Users() {
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState('All Locations');

  useEffect(() => {
    axios
      .get(`${API}/users`)
      .then((res) => {
        setUsers(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //console.log(users)
  const uniqueLocation = (users) => {
    let arr = [];
    for (let user of users) {
      if (!arr.includes(user.user_location)) {
        arr.push(user.user_location);
      }
    }
    return arr;
  };

  let locationsArray = uniqueLocation(users);
  //console.log(locationsArray)


  const getUsersByLocation = (users, location) => {
    let filteredUsers = users.filter((user) => {
      return user.user_location === location;
    });
    setUsers(filteredUsers);
  };

  //console.log(getUsersByLocation(users, location));

  const allUsers = users.map((user, idx) => {
    return (
      <Card className="usercard" key={idx}>
        <Card.Title>{user.user_name}</Card.Title>
        <Card.Link href={`/users/${user.user_email}`}>
          <Card.Img
            className="userImage"
            src={user.user_avatar}
            alt={user.user_name}
          />
        </Card.Link>
      </Card>
    );
  });

  return (
    <Container>
      <Form.Select onChange={(e) => setLocation(e.target.value)}>
        <option>All Locations</option>
        {locationsArray.map((location, idx) => {
          return <option key={idx}>{location}</option>;
        })}
      </Form.Select>
      <Container>
        <Row xs={2} md={5}>
          {allUsers}
        </Row>
      </Container>
    </Container>
  );
}

export default Users;
