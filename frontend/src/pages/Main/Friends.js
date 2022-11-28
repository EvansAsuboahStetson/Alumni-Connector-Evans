import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import Users from "../../components/Users/Users";
import { getUsers, updateUser, deleteUser } from "../../functions/users";
import AlertModal from "../../components/AlertModal/AlertModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import UserFormModal from "../../components/UserFormModal/UserFormModal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
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

  const history = useHistory();

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getUsers(token);
        setUsers(response.data);
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
    getAllUsers();
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
        onView={(user) => history.push(`/users/${user._id}`)}
      />

      <UserFormModal {...userForm} />
    </Container>
  );
}
