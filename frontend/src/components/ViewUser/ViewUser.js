import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Connect from "../Connect/Connect";
import "./ViewUser.css";

function ViewUser(props) {
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [interests, setInterest] = useState();
  const [major, setMajor] = useState();
  const [minor, setMinor] = useState();
  const [profilePic, setProfilePic] = useState();

  const user = props?.history?.location?.state;

  useEffect(() => {
    setName(user?.name);
    setId(user?._id);
    setEmail(user?.email);
    setMajor(user?.major);
    setMinor(user?.minor);
    setRole(user?.role);
    setInterest(user?.interests);
    setProfilePic(user?.profilePic);
  }, [props]);
  return (
    <div className="conty">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          style={{ width: "18rem", height: "17rem" }}
          variant="top"
          src={profilePic}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Major: {major}</Card.Text>
          <Card.Text>Minor: {minor}</Card.Text>
          <Card.Text>Role: {role}</Card.Text>
          <Card.Text>Interest: {interests?.map((x) => x + ", ")}</Card.Text>
          <Connect name={name} id={id} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewUser;
