import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Events from "../../components/Events/Events";
import { getEvents } from "../../functions/events";
import {getFollowerEvents,getPosts} from "../../functions/userEvents"
import AlertModal from "../../components/AlertModal/AlertModal";
import EventSearch from "../../components/EventSearch/EventSearch";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, title: "", message: "" });
  const [connectedFriends,setConnectedFriends]= useState([])



  const getAllFollowers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getFollowerEvents(token);

      setConnectedFriends(response?.data[0]?.connectedFriends)
  
    } 
    catch (error)
     {
      console.log(error)
    } 
  };

  const getPost = async () => {
    try {
      const data ={
        id : connectedFriends
      }
       console.log(connectedFriends)
      const token = localStorage.getItem("token");
      const response = await getPosts(token,data);
      console.log(response)
      setEvents(response?.data);

    } 
    catch (error)
     {
      console.log(error)
    } 
  };











  const getAllEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await getEvents(token);
      console.log("Events",response)
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
    getAllFollowers()
  
  }, []);

  useEffect(()=>{
    getPost()

  },[connectedFriends])

  return (
    // set filtered data in searchbar
    <Container>
      <EventSearch/>
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
