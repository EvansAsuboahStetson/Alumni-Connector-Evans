import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import { GETLIKEPOST } from "../../functions/userPosts";
import Chat from "../Chat/Chat";

function LikesModal(props) {
  const token = localStorage.getItem("token");
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    const LikesInfo = async () => {
      try {
  

        const data = {
          post_id: props.post._id,
        };
        const response = await GETLIKEPOST(data, token);

        setUserLikes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    LikesInfo();
  }, [props.post._id, props.updatelike]);

  return (
    <Modal
      {...props}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          People who liked
        </Modal.Title>
        
      </Modal.Header>
      
      <Modal.Body>
        {userLikes.map((user) => (
          <div key={user._id}>{user.name} <hr /></div>
          
        ))}


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
     
    </Modal>
  );
}

export default LikesModal;
