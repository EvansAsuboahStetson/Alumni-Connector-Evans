import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Events from "../../components/Events/Events";
import { getEvents } from "../../functions/events";
import AlertModal from "../../components/AlertModal/AlertModal";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });

  const getAllEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await getEvents(token);
      setEvents(response.data);
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

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <Events events={events} />
      )}

      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onHide={() => setAlert({ show: false, title: "", message: "" })}
      />
    </Container>
  );
}
