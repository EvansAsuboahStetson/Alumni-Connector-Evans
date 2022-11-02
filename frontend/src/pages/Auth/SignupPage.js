import { Card, Form, Button, Spinner, ButtonGroup } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../functions/auth";
import AlertModal from "../../components/AlertModal/AlertModal";

export default function SignupPage() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
  const userTypeRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const majorRef = useRef();


  const registerUser = async (data) => {
    setLoading(true);
    try {
      const response = await signup(data);
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


  // This is the code handling the change of the radiop buttons
  const [formBasicUserType, setUserType] = useState('student');
  const handleChange = (event) => {setUserType(event.target.value)}

  //Handle the dropdown
  const [type, setType] = useState("Accounting");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    // Register user
    const data = {
      role:formBasicUserType,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      name: nameRef.current.value,
      major: majorRef.current.value,
    };

    console.log(data)
   registerUser(data);
  };

  return (
    <div>
      {/* Show signup card */}
      <Card bg="dark" text="white" className="form-card">
        <Card.Header>Signup</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>


          <Form.Group controlId="formBasicUserType">
            
            <Form.Check
              value="student"
              type="radio"
              aria-label="radio 1"
              label="Student"
              ref={userTypeRef}
              onChange={handleChange}
              checked={formBasicUserType === "student"}
              
            />
            <Form.Check
              value="alumni"
              type="radio"
              aria-label="radio 2"
              label="Alumn"
              ref={userTypeRef}
              onChange={handleChange}
              checked={formBasicUserType === "alumni"}
            />
          </Form.Group>


            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email address"
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                ref={passwordRef}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                ref={nameRef}
              />
            </Form.Group>

{/*}
            <Form.Group controlId="formBasicFirst">
              <Form.Label>First</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter first name"
                ref={firstRef}
              />
            </Form.Group>


            <Form.Group controlId="formBasicLast">
              <Form.Label>Last</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter last name"
                ref={lastRef}
              />
            </Form.Group>
  */}

{/* Remove the free form text option - PH
            <Form.Group controlId="formBasicMajor">
              <Form.Label>Major</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter major"
                ref={majorRef}
              />
            </Form.Group>
*/}
          


            <Form.Group controlId="formBasicMajor">
              <Form.Label>Select Norm Type</Form.Label>
              <Form.Control
                as="select"
                ref={majorRef}
                value={type}
                onChange={e => {
                  console.log("e.target.value", e.target.value);
                  setType(e.target.value);
                }}
              >
                <option value="Accounting">Accounting</option>
                <option value="American Studies">American Studies</option>
                <option value="Applied Mathematics">Applied Mathematics</option>
                <option value="Aquatic and Marine Biology">Aquatic and Marine Biology</option>
                <option value="Art">Art</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Biology">Biology</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Business Systems Analysis">Business Systems Analysis</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Communication and Media Studies">Communication and Media Studies</option>
                <option value="Computer Information Systems">Computer Information Systems</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Digital Arts">Digital Arts</option>
              </Form.Control>
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

            {/* Footer link to login page */}
            <p className="mt-2">
              Already have an account? <Link to={"/"}>Login</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>

      {/* Show alert modal */}
      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onHide={() => setAlert({ show: false, title: "", message: "" })}
      />
    </div>
  );
}
