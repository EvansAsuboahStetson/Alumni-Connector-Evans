import { Row, Col } from "react-bootstrap";
import User from "../User/User";
import { useEffect } from "react";

export default function Users(props) {


  const { users, onEdit, onDelete, onView ,loggedInUser,UserConnected} = props;

  console.log("Using",loggedInUser)

  useEffect(()=>{

  },[UserConnected])

  
  return (
    <Row xs={1} md={2} className="g-4">
      {users?.map((user) => (
        <Col key={user._id}>
          <User
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
            loggedInUser={loggedInUser}
            UserConnected = {UserConnected}
          />
        </Col>
      ))}
    </Row>
  );
}
