import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import Users from "../../components/Users/Users";
import AlertModal from "../../components/AlertModal/AlertModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import UserFormModal from "../../components/UserFormModal/UserFormModal";
import {getUserId,getFriends,getUsers} from "../../functions/users"

export default function UsersPage() {
  const [connectedFriends,setConnectedFriends]= useState([])

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


  const getAllFollowersID = async () => {
    try {
     
      const token = localStorage.getItem("token");

      const response = await getUserId(token)

      setConnectedFriends(response?.data?.connectedFriends)
    

      // setConnectedFriends(response?.data[0]?.connectedFriends)
  
    } 
    catch (error)
     {
      console.log(error)
    } 
  };














  const getFollowersInfo = async () => {
    try {
     
      const token = localStorage.getItem("token");
      console.log(connectedFriends,"Here")

      const credentials = {
        data : connectedFriends
      }

     
   
    

        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await getFriends(token,credentials)
          console.log(response.data,"Quick")
          setUsers(response.data);
        } catch (error) {
          // Show error
          console.log(error)
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
      




      // setConnectedFriends(response?.data[0]?.connectedFriends)
  
    } 
    catch (error)
     {
      console.log(error)
    } 
  };

  useEffect(()=>{

   getFollowersInfo()
  },[connectedFriends])








  const history = useHistory();

  useEffect(() => {
  

    getAllFollowersID()


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
       
      />

      <UserFormModal {...userForm} />
    </Container>
  );
}
