import { Card, Button, Row, Col } from "react-bootstrap";

export default function User(props) {
  const { user, onEdit, onDelete, onView } = props;
  return (
    <Card className="mt-2 mb-2 ml-2 mr-2">
      <Row className="g-4">
        <Col md="8">
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
            <Card.Text>Street: {user.address?.street}</Card.Text>
            <Card.Text>City: {user.address?.city}</Card.Text>
            <Card.Text>Zip: {user.address?.zip}</Card.Text>
          </Card.Body>
        </Col>
        <Col md="4">
          <Card.Body>
            {onEdit && (
              <Row>
                <Col>
                  <Button variant="primary" onClick={() => onEdit(user)}>
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
                    onClick={() => onDelete(user)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )}
            {onView && (
              <Row>
                <Col>
                  <Button
                    className="mt-4"
                    variant="danger"
                    onClick={() => onView(user)}
                  >
                    View
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
