import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Events from "../../components/Events/Events";
import { getEvents } from "../../functions/events";
import { getFollowerEvents, getPosts } from "../../functions/userEvents";
import AlertModal from "../../components/AlertModal/AlertModal";
import EventSearch from "../../components/EventSearch/EventSearch";
import PostBox from "../../components/PostBox/PostBox";
import { Row, Col } from "react-bootstrap";
import PostCard from "../../components/PostCardModal/PostCard";
import PostCardWrapper from "../../components/PostCardModal/PostCardWrapper";
import { getUserId } from "../../functions/users";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
  const [connectedFriends, setConnectedFriends] = useState([]);
  const [user,setUser]= useState({})

  const getAllFollowers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getFollowerEvents(token);

      setConnectedFriends(response?.data[0]?.connectedFriends);
    } catch (error) {
      console.log(error);
    }
  };







  const getUserInfo = async ()=>{
    try{
      const token = localStorage.getItem("token");
      const response = await getUserId(token);
      setUser(response.data)

      console.log(response?.data)
    }
    catch(error)
    {
      console.log(error)
    }
  }

  const getPost = async () => {
    try {
      const data = {
        id: connectedFriends,
      };
      console.log(connectedFriends);
      const token = localStorage.getItem("token");
      const response = await getPosts(token, data);
      console.log(response);
      setEvents(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    getUserInfo()
    getAllFollowers();
  }, []);

  useEffect(() => {
    getPost();
  }, [connectedFriends]);

  return (
    // set filtered data in searchbar
    <Container>
      <Row>
        <Col>
          <EventSearch />
        </Col>
        <Col sm={12} md={6} className="flex-column flex-sm-row">
          <PostBox props= {user} />
          <PostCardWrapper/>
        </Col>
        <Col>
          {" "}
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : (
            <Events events={events} />
          )}
        </Col>
      </Row>
      <AlertModal
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onHide={() => setAlert({ show: false, title: "", message: "" })}
      />
    </Container>
  );
}
