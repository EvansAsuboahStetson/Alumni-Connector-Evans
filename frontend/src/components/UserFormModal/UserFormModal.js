import { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Show modal to create or edit user
export default function UserFormModal(props) {
  const [validated, setValidated] = useState();
  const { show, onHide, title, user, onSubmit } = props;

  const nameRef = useRef(user?.name);
  const emailRef = useRef(user?.email);
  const streetRef = useRef(user?.address?.street);
  const cityRef = useRef(user?.address?.city);
  const zipRef = useRef(user?.address?.zip);

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

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        zip: zipRef.current.value,
      },
    };

    onSubmit(user);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTextName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              ref={nameRef}
              defaultValue={user?.name}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email address"
              ref={emailRef}
              defaultValue={user?.email}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              ref={streetRef}
              defaultValue={user?.address?.street}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              ref={cityRef}
              defaultValue={user?.address?.city}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip"
              ref={zipRef}
              defaultValue={user?.address?.zip}
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
