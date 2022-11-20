import React, { useEffect } from "react";

import { Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
  connectionRequest,
  pendingFriend,
  isConnected,
  sentRequest,
} from "../../functions/users";

import { useState } from "react";
function Connect({ name, id, change }) {
  const [btnActive, setbtnActive] = useState(true);
  const [btnConnect, setBtnConnect] = useState(false);
  const [sentConnect, setSentConnect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const datum = {
        id: id,
      };
      const ggg = await isConnected(token, datum);

      const isConnect_array = ggg.data[0]?.connectedFriends;

      if (isConnect_array?.length > 0) {
        setBtnConnect(true);
      }
      const { data } = await pendingFriend(token, datum);

      const sentReq = await sentRequest(token, datum);

      const userpending = data[0]?.pendingFriends;
      const userSent = sentReq?.data[0]?.sentRequest;

      console.log(userpending,"userpending")
      console.log(userSent,"userSent")

      if (userpending?.length > 0) {
        setbtnActive(false);
      } else if (userSent?.length > 0) {
          setSentConnect(true);
          setbtnActive(false);
        }
        else{
          setBtnConnect(false);
          setSentConnect(false);
          setbtnActive(true)
        }
      
    };

    fetchData();
   
  }, [btnActive, btnConnect, sentConnect, id, name]);

  const [show, setShow] = useState(false);

  const handleYes = async (close) => {
    try {
      const token = localStorage.getItem("token");

      const datum = {
        id: id,
      };

      const { data } = await connectionRequest(token, datum);

      setbtnActive(false);
    } catch (err) {}
    setShow(false);
  };
  const handleNo = (close) => {
    setShow(false);
  };
  const handleShow = (Yes) => {
    setShow(true);
  };

  return (
    <div>
      <div>
        {console.log("btnConnect",btnConnect,"btnActive",btnConnect)}
        {btnConnect ? (
          
          <Button variant="secondary" disabled>
            Connected
        
          </Button>
        ) : (
          <>
            {btnActive ? (
              <Button variant="primary" onClick={handleShow}>
                {" "}
                Add to Contact{" "}
              </Button>
            ) : (
              <>
                {sentConnect ? (
                  <Button variant="secondary" disabled>
                    {" "}
                    Sent Request{" "}
                  </Button>
                ) : (
                  <Button variant="secondary" size="lg" disabled>
                    Pending Request
                  </Button>
                )}{" "}
              </>
            )}{" "}
          </>
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
