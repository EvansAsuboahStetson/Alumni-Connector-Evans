import { Card, Form, Button, Spinner } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../functions/auth";
import AlertModal from "../../components/AlertModal/AlertModal";

export default function LoginPage() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });

  const emailRef = useRef();
  const passwordRef = useRef();

  const authenticateUser = async (data) => {
    setLoading(true);
    try {
      const response = await login(data);
      const { token, ...user } = response.data;

      // Save data to local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Redirect to home page
      window.location = "/";
    } catch (error) {
      // Show error
      setAlert({
        show: true,
        title: "Error",
        message:
          error.response.data.message ||
          error.response.data.error ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    // Authenticate user
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    authenticateUser(data);
  };

  return (
    <div>
      {/* Show login card */}
      <img className="logo" src="/images/logo.png"/>
      <Card bg="dark" text="white" className="form-card">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mt-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Button
              className="mt-2"
              variant="outline-light"
              type="submit"
              disabled={loading}
            >
              <span className={loading ? "visually-hidden" : ""}>Submit</span>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="light"
                className={loading ? "" : "visually-hidden"}
              />
            </Button>

            {/* Footer link to signup to create an account */}
            <p className="mt-2">
              Don't have an account? <Link to={"/signup"}>Signup</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>

      {/* Show alert modal */}
      <AlertModal
        show={alert.show}
        onHide={() => setAlert({ show: false, title: "", message: "" })}
        title={alert.title}
        message={alert.message}
      />
    </div>
  );
}
