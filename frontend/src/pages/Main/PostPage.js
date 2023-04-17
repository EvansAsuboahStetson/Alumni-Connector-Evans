import React, { useEffect } from "react";
import PostForm from "../../components/EventFormModal/UserPost/PostForm";
import { useState } from "react";
import { createUserPost } from "../../functions/userPosts";
import AlertModal from "../../components/AlertModal/AlertModal";

function PostPage({ handleCloseModal, Component, showSuccess }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });

  const [postForm, setPostForm] = useState({
    show: true,
    validated: false,
    title: "",
    post: {},
    onHide: () => {
      setPostForm((prev) => ({ ...prev, show: false }));
      handleCloseModal();
    },
    onSubmit: async (post) => {
      submitApost(post);
      showSuccess();
    },
  });

  const submitApost = async (post) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await createUserPost(post, token);



      setAlert({
        show: true,
        title: "Success",
        message: "Vroom There you go with your post",
      });

      setPostForm((prev) => ({ ...prev, show: false }));
    } catch (error) {
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
    console.log(alert);
  }, [alert]);

  return (
    <div>
      <PostForm {...postForm} />
    </div>
  );
}

export default PostPage;
