import React, { useEffect } from "react";

import { Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { connectionRequest, pendingFriend } from "../../functions/users";

import { useState } from "react";
function Connect({ name, id }) {
  const [btnActive, setbtnActive] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const datum = {
        id: id,
      };

      const { data } = await pendingFriend(token, datum);

      const userpending = data[0]?.pendingFriends;
      console.log(userpending, "userPending");

      if (userpending?.length > 0) {
        console.log("I am greater");
        setbtnActive(false);
      }

      console.log(data, "data");
    };

    fetchData();
  }, [btnActive]);
  const [isConnect, setIsConnect] = useState(false);
  const [show, setShow] = useState(false);

  const handleYes = async (close) => {
    try {
      const token = localStorage.getItem("token");

      const datum = {
        id: id,
      };

      const { data } = await connectionRequest(token, datum);
      console.log(data, "Cindy me");
      setbtnActive(false)
    } catch (err) {}
    setShow(false);
  };
  const handleNo = (close) => {
    console.log("No");
    setShow(false);
  };
  const handleShow = (Yes) => {
    setShow(true);
  };

  return (
    <div>
      <div>
        {btnActive ? (
          <Button variant="primary" onClick={handleShow}>
            Add to Contact
          </Button>
        ) : (
          <Button variant="secondary" size="lg" disabled>
            Pending Request
          </Button>
        )}
      </div>
      <Modal show={show} onHide={handleNo}>
        <Modal.Header closeButton>
          <Modal.Title>Connection Request?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to connect with {name} {id}{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNo}>
            No
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Connect;
