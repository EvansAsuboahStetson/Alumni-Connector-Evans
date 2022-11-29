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
  const [btnPending, setBtnPending] = useState(false);
  const [btnConnect, setBtnConnect] = useState(false);
  const [sentConnect, setSentConnect] = useState(false);
  const [btnActive, setbtnActive] = useState(false);

  useEffect(() => {
    setBtnPending(false);
    setBtnConnect(false);
    setSentConnect(false);
    setbtnActive(false);
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const datum = {
        id: id,
      };
      const ggg = await isConnected(token, datum);

      const { data } = await pendingFriend(token, datum);

      const sentReq = await sentRequest(token, datum);

      const userpending = data[0]?.pendingFriends;
      const userSent = sentReq?.data[0]?.sentRequest;
      const isConnect_array = ggg.data[0]?.connectedFriends;

      if (userpending !== undefined) {
        setBtnPending(true);
        console.log("Yes pending undefined");
        return;
      } else if (userSent !== undefined) {
        console.log(userSent, "Sent");
        if (isConnect_array !== undefined) {
          console.log("Yes connected undefined");
          setBtnConnect(true);
          return;
        }

        setSentConnect(true);
        return;
      } else if (isConnect_array !== undefined) {
        console.log("Yes connected undefined");
        setBtnConnect(true);
        return;
      } else {
        setbtnActive(true);
      }
    };

    fetchData();
  }, [name, id]);

  const [show, setShow] = useState(false);

  const handleYes = async (close) => {
    try {
      const token = localStorage.getItem("token");

      const datum = {
        id: id,
      };

      const { data } = await connectionRequest(token, datum);

      setSentConnect(true);
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
        {console.log(
          "btnConnect",
          btnConnect,
          "btnActive",
          btnActive,
          "btnSent",
          sentConnect
        )}
        {btnConnect ? (
          <Button variant="secondary" disabled>
            Connected
          </Button>
        ) : (
          <>
            {btnPending ? (
              <Button variant="secondary" size="lg" disabled>
                Pending Request
              </Button>
            ) : (
              <>
                {sentConnect ? (
                  <Button variant="secondary" disabled>
                    {" "}
                    Sent Request{" "}
                  </Button>
                ) : (
                  <>
                    {btnActive ? (
                      <Button variant="primary" onClick={handleShow}>
                        {" "}
                        Add to Contact{" "}
                      </Button>
                    ) : (
                      <Button variant="secondary" size="lg" disabled>
                        NOTHING
                      </Button>
                    )}{" "}
                  </>
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
          Do you want to connect with {name}?
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
