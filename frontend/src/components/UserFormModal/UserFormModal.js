import { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Show modal to create or edit user
export default function UserFormModal(props) {
  const [validated, setValidated] = useState();
  const { show, onHide, title, user, onSubmit } = props;

  const nameRef = useRef(user?.name);
  const emailRef = useRef(user?.email);
  const roleRef = useRef(user?.role);
  const majorRef = useRef(user?.major);
  const interestsRef = useRef(user?.interests);

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
      role: roleRef.current.value,
      major: majorRef.current.value,
      interests: interestsRef.current.value,
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

          <Form.Group controlId="formBasicTextEmail">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              ref={roleRef}
              defaultValue={user?.role}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextMajor">
            <Form.Label>Major</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter major"
              ref={majorRef}
              defaultValue={user?.major}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicTextInterests">
            <Form.Label>Interests</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter interests"
              ref={interestsRef}
              defaultValue={user?.interests}
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
