import React, { useEffect, useState } from "react";
import "./PostBox.css";

import AvatarImage from "./avatar.jpg";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import PostPage from "../../pages/Main/PostPage";
import AlertModal from "../AlertModal/AlertModal";

function PostBox() {
  const [showComponent, setShowComponent] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });

  const showSuccess = () => {
    setAlert({
      show: true,
      title: "Vroom You successfully Posted",
      message: "Your post is online",
    });
  };

  const handleCloseModal = () => {
    setShowComponent(false);
  };

  const handleClick = () => {
    setShowComponent(true);
  };

  return (
    <div class="card border">
      <div class="card-header">What is on your mind</div>

      <div class="card-body">
        <Stack direction="row" spacing={2}>
          <Avatar alt="Remy Sharp" src={AvatarImage} />
          <input
            class="form-control"
            type="text"
            placeholder="Start a Post"
            onClick={handleClick}
            readOnly
          />
        </Stack>
        {showComponent && (
          <PostPage
            showComponent={showComponent}
            handleCloseModal={handleCloseModal}
            showSuccess={showSuccess} // pass the callback function to the modal component
          />
        )}

        <AlertModal
          show={alert.show}
          title={alert.title}
          message={alert.message}
          onHide={() => setAlert({ show: false, title: "", message: "" })}
        />
      </div>
    </div>
  );
}

export default PostBox;
