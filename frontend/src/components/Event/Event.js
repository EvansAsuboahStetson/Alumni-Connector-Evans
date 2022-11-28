import { Card, Button, Row, Col } from "react-bootstrap";
import User from "../../components/User/User";

export default function Event(props) {
  const { event, onEdit, onDelete } = props;

  return (
    <Card className="mt-2 mb-2">
      <Row className="g-4">
        <Col md="6">
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>Posted By: {User.name}</Card.Text>
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
                  <Button variant="primary" onClick={() => onEdit(event)}>
                    Edit
                  </Button>
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
