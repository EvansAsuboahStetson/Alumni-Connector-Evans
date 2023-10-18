import { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./UserPost.css";
import Dropdown from "react-bootstrap/Dropdown";
import AlertModal from "../../AlertModal/AlertModal";
import { getUserId } from "../../../functions/users";
import Chat from "../../Chat/Chat";

// Show modal to create or edit Twitter post
export default function PostForm(props) {
  console.log(props?.user?._id)

  const [validated, setValidated] = useState();
  const { show, onHide, title, post, onSubmit} = props;

  const textRef = useRef(post?.text);
  const [date, setDate] = useState(post?.date || new Date());

  useEffect(() => {
    if (show) {
      setValidated(false);
      console.log(show,"Here is how")

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

    const post = {
      text: textRef.current.value,
      date: date,
    };

    onSubmit(post);
  
   onHide()
 
  };

  function CustomModalHeader(props) {
    return (
      <Modal.Header closeButton>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar className="avatar" imageUrl={props.imageUrl} />
          <div className="name">{props.name}</div>
          <div className="dropdown-container">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
              ></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Stack>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
    );
  }
  return (
    <Modal show={show} onHide={onHide}>
      <CustomModalHeader name={"Evans Asuboah"} closeButton>
        <Modal.Title>{title}</Modal.Title>
      </CustomModalHeader>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicText">
            {/* <Form.Label>What's on your mind?</Form.Label> */}
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What is on your mind"
              ref={textRef}
              defaultValue={post?.text}
              required
            />
          </Form.Group>

          <Button className="m-2" variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button className="m-2" type="submit" variant="success">
            Post
          </Button>    
          <Button className="m-2" type="submit" variant="success" onClick={"S"}>
            ChatF
          </Button>   
 
          {/* <Chat userId={props?.user?._id} user= {props?.user}/> */}

        </Form>
      </Modal.Body>
    </Modal>
  );
}
