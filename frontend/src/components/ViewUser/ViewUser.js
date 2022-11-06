import React from 'react'
import { Card, Button, Row, Col } from "react-bootstrap";
import "./ViewUser.css"

function ViewUser(props) {
    console.log(props)
    const user = props?.history?.location?.state
  return (
    <div className="conty">
    <Card style={{ width: '18rem' }}>
      <Card.Img  style={{ width: '18rem' , height:'17rem'}} variant="top" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
         Email: {user.email}
        </Card.Text>
        <Card.Text>
          Major: {user.major}
        </Card.Text>
        <Card.Text>
          Role: {user.role}
        </Card.Text>
        <Card.Text>
          Interest: {user?.interests}
        </Card.Text>
        <Button variant="primary">Send Email</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ViewUser