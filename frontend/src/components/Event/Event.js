import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import User from "../../components/User/User";
import { pendingRequestNames } from "../../functions/users";

export default function Event(props) {
  const { event, onEdit, onDelete } = props;
  const [name,setName] = useState()

  useEffect(()=>{
    const getNames =async()=>{
     const user = event?.createdBy


     try{
      const token = localStorage.getItem("token");
      const datum= {
        follower: [user]
      }
      const {data} = await pendingRequestNames(token,datum)

      setName(data[0]?.name)
     

     }
     catch(error)
     {

     }
    }

    getNames()

  },[props])


  return (
    <Card className="mt-2 mb-2">
      <Row className="g-4">
        <Col md="6">
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>Posted By: {name}</Card.Text>
            <Card.Text>{event.description}</Card.Text>
            <Card.Text>Location: {event.location}</Card.Text>
            <Card.Text>Date: {event.date}</Card.Text>
            <Card.Text>Start Time: {event.Starttime}</Card.Text>
            <Card.Text>End Time: {event.Endtime}</Card.Text>
          </Card.Body>
        </Col>
        <Col md="2">
          <Card.Body>
            {onEdit && (
              <Row>
                <Col>
                  <Button variant="primary" onClick={() => onEdit(event)}>Edit</Button>
                </Col>
              </Row>
            )}
            {onDelete && (
              <Row>
                <Col>
                  <Button
                    className="mt-4"
                    variant="danger"
                    onClick={() => onDelete(event)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
