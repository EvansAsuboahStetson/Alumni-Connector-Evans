import { Card, Button, Row, Col } from "react-bootstrap";

export default function Event(props) {
  const { event, onEdit, onDelete } = props;
  return (
    <Card className="mt-2 mb-2">
      <Row className="g-4">
        <Col md="4">
          <Card.Img src={event.image} alt="Event image" />
        </Col>
        <Col md="6">
          <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text>{event.description}</Card.Text>
            <Card.Text>Location: {event.location}</Card.Text>
            <Card.Text>Starts on: {event.date}</Card.Text>
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
