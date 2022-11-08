import { Card, Button, Row, Col } from "react-bootstrap";
import "./User.css"

export default function User(props) {
  const { user, onEdit, onDelete, onView } = props;
  console.log(user.interests,"interests")
  return (
    <Card className="mt-2 mb-2 ml-2 mr-2" style={{ width: '22rem', height:'38rem'}}>
      <Row className="g-3">
        <Col md="7">
          <Card.Body>
          <Card.Img  style={{ width: '20rem' ,height:'15rem' }} variant="top" src={user.profilePic}  onClick={() => onEdit(user)} />
            {/* <img src={user.profilePic} alt="user" style={{height: '200px', width : '400px'}} /> */}
          </Card.Body>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md="8">
          <Card.Body className="edit">
            <Card.Title >Name: {user.name}</Card.Title>
            <Card.Text className="edit-values">Email: {user.email}</Card.Text>
            <Card.Text className="edit-values">Role: {user.role}</Card.Text>
            <Card.Text className="edit-values">Major: {user.major}</Card.Text>
            <Card.Text className="edit-values">Minor: {user.minor}</Card.Text>
            <Card.Text className="edit-values">Interests: { user.interests?.map(x => x + ", ")}</Card.Text>
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
