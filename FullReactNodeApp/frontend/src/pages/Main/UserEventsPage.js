import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import Events from "../../components/Events/Events";
import {
  getUserEvents,
  updateUserEvent,
  deleteUserEvent,
  createUserEvent,
} from "../../functions/userEvents";
import AlertModal from "../../components/AlertModal/AlertModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import EventFormModal from "../../components/EventFormModal/EventFormModal";

export default function UserEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
  const [confirm, setConfirm] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [eventForm, setEventForm] = useState({
    show: false,
    validated: false,
    title: "",
    event: {},
    onHide: () => {},
    onSubmit: () => {},
  });
  const { userId } = useParams();

  useEffect(() => {
    const getEventsOfUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getUserEvents(userId, token);
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
    getEventsOfUser();
  }, [userId]);

  const handleEdit = (event) => {
    // Show event form
    setEventForm({
      show: true,
      validated: false,
      title: "Edit Event",
      event: event,
      onHide: () =>
        setEventForm({
          show: false,
          validated: false,
          title: "",
          event: {},
          onSubmit: () => {},
          onHide: () => {},
        }),
      onSubmit: (e) => {
        updateEventOfUser(e, event._id);
        setEventForm({
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

  const updateEventOfUser = async (event, eventId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateUserEvent(userId, eventId, event, token);

      // Update the event in the list
      const updatedEvents = events.map((e) => {
        if (e._id === eventId) {
          return response.data;
        }
        return e;
      });

      setEvents(updatedEvents);
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

  const handleDelete = (event) => {
    // Show confirm modal
    setConfirm({
      show: true,
      title: "Delete event",
      message: "Are you sure you want to delete this event?",
      onConfirm: () => {
        setConfirm({
          show: false,
          title: "",
          message: "",
          onConfirm: () => {},
        });
        deleteEvent(event);
      },
    });
  };

  const deleteEvent = async (event) => {
    setLoading(true);
    try {
      const eventId = event._id;
      const token = localStorage.getItem("token");
      await deleteUserEvent(userId, eventId, token);

      // Update the event in the list
      const updatedEvents = events.filter((e) => e._id !== eventId);
      setEvents(updatedEvents);

      // Show success message
      setAlert({
        show: true,
        title: "Success",
        message: "Event deleted successfully",
      });
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

  const handleCreate = () => {
    // Show event form
    setEventForm({
      show: true,
      validated: false,
      title: "Create Event",
      event: {},
      onHide: () =>
        setEventForm({
          show: false,
          validated: false,
          title: "",
          event: {},
          onSubmit: () => {},
          onHide: () => {},
        }),
      onSubmit: (e) => {
        createEventOfUser(e);
        setEventForm({
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

  // Create user event
  const createEventOfUser = async (event) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await createUserEvent(userId, event, token);

      // Add the event to the list
      setEvents([...events, response.data]);

      // Show success message
      setAlert({
        show: true,
        title: "Success",
        message: "Event created successfully",
      });
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

      <Events events={events} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Show create event button at bottom center */}
      <div className="d-flex justify-content-center">
        <Button variant="dark" className="mt-3 mb-3" onClick={handleCreate}>
          Create event
        </Button>
      </div>

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

      <EventFormModal {...eventForm} />
    </Container>
  );
}
