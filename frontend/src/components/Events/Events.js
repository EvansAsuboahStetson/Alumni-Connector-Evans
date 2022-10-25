import { Row, Col } from "react-bootstrap";
import Event from "../Event/Event";

export default function Events(props) {
  const { events, onEdit, onDelete } = props;
  return (
    <Row xs={1} md={1} className="g-4">
      {events?.map((event) => (
        <Col key={event._id}>
          <Event event={event} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
}
