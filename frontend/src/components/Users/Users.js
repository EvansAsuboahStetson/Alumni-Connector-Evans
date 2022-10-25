import { Row, Col } from "react-bootstrap";
import User from "../User/User";

export default function Users(props) {
  const { users, onEdit, onDelete, onView } = props;
  return (
    <Row xs={1} md={2} className="g-4">
      {users?.map((user) => (
        <Col key={user._id}>
          <User
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </Col>
      ))}
    </Row>
  );
}
