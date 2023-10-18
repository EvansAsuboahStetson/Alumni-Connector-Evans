import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import Users from "../../components/Users/Users";
import AlertModal from "../../components/AlertModal/AlertModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import UserFormModal from "../../components/UserFormModal/UserFormModal";
import { getUserId, getFriends } from "../../functions/users";

export default function UsersPage() {
  const [connectedFriends, setConnectedFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
  const [UserConnected, setUserConnected] = useState([]);
  const [confirm, setConfirm] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [userForm, setUserForm] = useState({
    show: false,
    validated: false,
    user: {},
    title: "",
    onHide: () => {},
    onSubmit: () => {},
  });

  const getAllFollowersID = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getUserId(token);
      setUserConnected(response?.data);
      setConnectedFriends(response?.data?.connectedFriends);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowersInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const credentials = {
        data: connectedFriends,
      };
      const response = await getFriends(token, credentials);
      console.log("Friends are good", response.data);
     
        setUsers(response.data);
      
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getAllFollowersID();
  }, []);

  useEffect(() => {
    getFollowersInfo();
    console.log(UserConnected, "Free");
    console.log(users, "Freedom");
  }, [connectedFriends, UserConnected]);

  const handleDelete = (connectedFriend) => {
    setConfirm({
      show: true,
      title: "Delete friend",
      message: "Are you sure you want to delete this friend?",
      onConfirm: () => {
        setConfirm({
          show: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
        //deleteEvent(connectedFriend);
      },
    });
  };
  const history = useHistory();

  useEffect(() => {
    getAllFollowersID();
    console.log("This is friend", users);
  }, []);

  return (
    <Container>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="dark" />
        </div>
      )}

      <Users
        users={users}
        onDelete={handleDelete}
        UserConnected={UserConnected}
     
      />

      <ConfirmModal
        show={confirm.show}
        title={confirm.title}
        message={confirm.message}
        onHide={() =>
          setConfirm({
            show: false,
            title: "",
            message: "",
            onConfirm: () => {},
          })
        }
        onConfirm={confirm.onConfirm}
      />

      <UserFormModal {...userForm} />
    </Container>
  );
}
