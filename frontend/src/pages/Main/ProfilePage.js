import { useState, useEffect } from "react";
import { Container, Spinner, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import User from "../../components/User/User";
import { getUser, updateUser } from "../../functions/users";
import AlertModal from "../../components/AlertModal/AlertModal";
import UserFormModal from "../../components/UserFormModal/UserFormModal";

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
  const [userForm, setUserForm] = useState({
    show: false,
    validated: false,
    user: {},
    title: "",
    onHide: () => {},
    onSubmit: () => {},
  });

  const { userId } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getUser(userId, token);
        setUser(response.data);
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
    getUserById();
  }, [userId]);

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
      setUser(response.data);
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
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div className="form-card">
          <User user={user} onEdit={handleEdit} />
        </div>
      )}
      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onHide={() => setAlert({ show: false, title: "", message: "" })}
      />
      <UserFormModal {...userForm} />
    </Container>
  );
}
