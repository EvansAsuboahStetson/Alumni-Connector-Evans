import { Card, Button, Row, Col } from "react-bootstrap";

export default function User(props) {
  const { user, onEdit, onDelete, onView } = props;
  console.log(user.interests,"interests")
  return (
    <Card className="mt-2 mb-2 ml-2 mr-2">
      <Row className="g-4">
        <Col md="8">
          <Card.Body>
            <Card.Title>Name: {user.name}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
            <Card.Text>Role: {user.role}</Card.Text>
            <Card.Text>Major: {user.major}</Card.Text>
            <Card.Text>Interests: { user.interests?.map(x => x + " , ")}</Card.Text>
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
