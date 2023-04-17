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
        console.log("HEYEYE",response)
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

  const handleEdit = (user) => {
    // Show user form
    setUserForm({
      show: true,
      validated: false,
      user,
      title: "Edit User",
      onHide: () =>
        setUserForm({
          show: false,
          validated: false,
          user: {},
          title: "",
          onHide: () => {},
          onSubmit: () => {},
        }),
      onSubmit: (u) => {
        updateUserById(u, user._id);
        setUserForm({
          show: false,
          validated: false,
          title: "",
          event: {},
          onSubmit: () => {},
          onHide: () => {},
        });
      },
    });
  };

  const updateUserById = async (user, id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateUser(id, user, token);
      setUsers(users.map((u) => (u._id === id ? response.data : u)));
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

  const handleDelete = (user) => {
    // Show confirm modal
    setConfirm({
      show: true,
      title: "Delete User",
      message: `Are you sure you want to delete ${user.name}?`,
      onConfirm: () => {
        deleteUserById(user._id);
        setConfirm({
          show: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
      },
    });
  };

  const deleteUserById = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await deleteUser(id, token);
      setUsers(users.filter((u) => u._id !== id));
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

  return (
    <Container>
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="dark" />
        </div>
      )}

      <Users
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(user) => history.push(`/users/${user._id}`)}
      />

      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onHide={() => setAlert({ show: false, title: "", message: "" })}
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
