import { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Show modal to create or edit event
export default function EventFormModal(props) {
  const [validated, setValidated] = useState();
  const { show, onHide, title, event, onSubmit } = props;

  const nameRef = useRef(event?.name);
  const descriptionRef = useRef(event?.description);
  const dateRef = useRef(event?.date);
  const imageRef = useRef(event?.image);
  const locationRef = useRef(event?.location);

  useEffect(() => {
    if (show) {
      setValidated(false);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    e.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    const event = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
      image: imageRef.current.value,
      location: locationRef.current.value,
    };

    onSubmit(event);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTextName">
            <Form.Label>Event name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event name"
              ref={nameRef}
              defaultValue={event?.name}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextDescription">
            <Form.Label>Event description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event description"
              ref={descriptionRef}
              defaultValue={event?.description}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicDate">
            <Form.Label>Event date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter event date"
              ref={dateRef}
              defaultValue={event?.date}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextImage">
            <Form.Label>Event image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event image"
              ref={imageRef}
              defaultValue={event?.image}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextLocation">
            <Form.Label>Event location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event location"
              ref={locationRef}
              defaultValue={event?.location}
              required
            />
          </Form.Group>

          <Button className="m-2" variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="m-2" type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
