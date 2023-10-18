import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Modal, Button } from "react-bootstrap";
import "./Chat.css";

const Chat = ({ userId, user, loggedInUser }) => {
  console.log(user);

  const roomID = [userId, loggedInUser].sort().join("_");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [permission, setPermission] = useState(Notification.permission);
  const [chatWindowOpen, setChatWindowOpen] = useState(false); // new state variable
  const socketRef = useRef();

  console.log(roomID);

  useEffect(() => {
    // Connect to the WebSocket server
    socketRef.current = io("http://localhost:5000");

    // Join a room
    socketRef.current.emit("joinRoom", roomID);

    // Receive new messages from other users
    socketRef.current.on("message", (msg) => {
      console.log(msg,"Msg: ",chatWindowOpen,permission)
      setMessages((prevMessages) => [...prevMessages, msg]);
      
      if (!chatWindowOpen && permission === "granted") {
        // show notification only if chat window is closed
        new Notification(`New Message from ${msg.userName}`, {
          body: msg.content,
        });
      }
    });

    // Receive previous messages from the server
    socketRef.current.on("previousMessages", (prevMessages) => {
      setMessages(prevMessages);
    });

    // Request previous messages when the component mounts
    socketRef.current.emit("previousMessages", roomID);

    // Disconnect from the WebSocket server when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomID, permission, chatWindowOpen]);

  useEffect(() => {
    if (permission === "default") {
      Notification.requestPermission().then((result) => {
        setPermission(result);
      });
    }
  }, [permission]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessageObj = {
      userId: userId,
      content: newMessage,
      userName: user.name,
      roomId: roomID,
      Date: new Date().toLocaleString(),
    };
    console.log(newMessage, "hand");
    socketRef.current.emit("message", newMessageObj);
    setNewMessage("");
  };

  const handleShowModal = () => {
    setShowModal(true);
    setChatWindowOpen(true); // update chat window state when it is opened
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setChatWindowOpen(false); // update chat window state when it is closed
  };

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        style={{ marginTop: "10px" }}
        onClick={handleShowModal}
      >
        Send Message
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <div
            style={{
              backgroundColor: "white",
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "1rem",
              width: "300px",
              height: "400px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <ul
                style={{
                  flex: "1",
                  overflowY: "scroll",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                {messages
                  .slice()
                  .reverse()
                  .map((msg, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent:
                          userId === msg.userId ? "flex-end" : "flex-start",
                        margin: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {userId !== msg.userId && (
                          <span style={{ fontWeight: "bold" }}>
                            {msg.userName}
                          </span>
                        )}
                        <span style={{ fontSize: "0.8rem", color: "#FFFF" }}>
                          {msg.Date}
                        </span>
                      </div>
                      <div
                        style={{
                          backgroundColor:
                            userId === msg.userId ? "#dcf8c6" : "#ececec", // change background color
                          color: "#000",
                          padding: "0.5rem",
                          borderRadius: "1rem",
                          maxWidth: "70%",
                          alignSelf:
                            userId === msg.userId ? "flex-end" : "flex-start", // align to the right for the logged-in user's messages
                        }}
                      >
                        {msg.content}
                      </div>
                    </li>
                  ))}
              </ul>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  borderTop: "1px solid #ccc",
                }}
              >
                <input
                  type="text"
                  placeholder="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  autoFocus
                  style={{
                    flex: "1",
                    fontSize: "1rem",
                    padding: "0.5rem",
                    borderRadius: "1rem",
                    border: "none",
                    marginRight: "0.5rem",
                  }}
                />

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#075e54",
                    color: "#fff",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "2.5rem",
                    height: "2.5rem",
                  }}
                >
                  <i className="fa fa-send" />
                  Send
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Chat;
