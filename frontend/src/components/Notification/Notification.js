import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Noty from "./NotiIcon";
import {acceptFriendRequest,pendingFriendRequest,deleteFriendRequest} from "../../functions/users"
import Modal from "react-bootstrap/Modal";

function Notification() {
  const [showA, setShowA] = useState(false);
  const [pendID, setpentID] = useState();
  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);
  const[del,setdel] =useState(false)

  const toggleShowA = () => setShowA(!showA);


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setpentID()
    
    setShow(false);
  };
  const handleAccept = async () => {
    try{
        const token = localStorage.getItem("token");
        const datum ={
            id:pendID
        }

     
        await deleteFriendRequest(token,datum)
        const {data} = await acceptFriendRequest(token,datum);
        setdel(!del)


     
        setpentID()
    
        
    }
    catch (err) {console.log(err)}
    setShow(false)
   
   
  };

  const handleDelete = async () => {
    try{
        const token = localStorage.getItem("token");
        const datum ={
            id:pendID
        }
        const {data} = await deleteFriendRequest(token,datum);
        setdel(!del)

        setpentID()
    
        
    }
    catch (err) {console.log(err)}
    setShow(false)
   
  };
 
  function handleShow(ID) {
    console.log("Here is my ID",ID)
    setpentID(ID)
    setShow(true)
  }

  useEffect(() => {
    const findRequest = async () => {
      const token = localStorage.getItem("token");

      const IdDatum = {
      }
      const { data } = await pendingFriendRequest(token,IdDatum);
      const datum = data[0].pendingFriends;
      setData(datum);
      const lengths = datum.length;
      setCount(lengths);
    
    };

    findRequest();
  }, [del]);

 

  return (
    <Row>
      <Noty
        width={"30px"}
        color={"#FFFFFF"}
        count={count}
        onclick={toggleShowA}
      />

      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Friend Request</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        {data?.map((user) => (
          <Toast.Body onClick={() => handleShow(user)}>
            You have friend request from {user}
          </Toast.Body>
        ))}
      </Toast>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connection Request?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to Accept or delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default Notification;
