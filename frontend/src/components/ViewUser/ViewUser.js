import React from 'react'
import { Card, Button, Row, Col } from "react-bootstrap";
import "./ViewUser.css"

function ViewUser(props) {
    console.log(props)
    const user = props?.history?.location?.state
  return (
    <div className="conty">
    <Card style={{ width: '18rem' }}>
      <Card.Img  style={{ width: '18rem' , height:'17rem'}} variant="top" src={user.profilePic} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
         Email: {user.email}
        </Card.Text>
        <Card.Text>
          Major: {user.major}
        </Card.Text>
        <Card.Text>
          Minor: {user.minor}
        </Card.Text>
        <Card.Text>
          Role: {user.role}
        </Card.Text>
        <Card.Text>
          Interest: {user.interests?.map(x => x + ", ")}
        </Card.Text>
        <Button variant="primary">Send Email</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ViewUser