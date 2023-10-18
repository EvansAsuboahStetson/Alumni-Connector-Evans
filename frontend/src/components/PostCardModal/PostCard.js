import { Avatar, AvatarGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Image from "./avatar.jpg";
import { Button, Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import "./PostCard.css";
import { updateUserPost, LikePost } from "../../functions/userPosts";
import CommentList from "../ReplyCommentModal/ReplyLIst";
import LikesModal from "../DisplayLikes/LikesModal";

function PostCard({ post, LoggedInuser }) {
  console.log(post,"is here")

  const [liked, setLiked] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const userId = LoggedInuser?._id;

  const textRef = useRef(post?.comment);

  const [commentary, setCommentary] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const [validated, setValidated] = useState(false);
  const [updateLike, setUpdateLike] = useState([]);

  const sendComment = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await updateUserPost(data, token);
    } catch (err) {
      console.log(err);
    }
  };

  const LikeComment = async (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await LikePost(data, token);
      console.log(response.data.likes, "like Response");

      console.log(userId,"fo")
      setUpdateLike(response.data.likes);
      setLiked(response.data.likes.includes(userId));
    } catch (err) {
      console.log(err);
    }
  };
  const likeButton = () => {
    LikeComment({
      post_id: post._id,
    });
  };

  const handleCommentChange = (event) => {
    setCommentary(event.target.value);
  };

  const handleCommentClick = () => {
    setShowCommentForm(!showCommentForm);
  };

  const SendClick = (e) => {
    e.preventDefault();

    if (commentary.length < 1) {
      return;
    }

    setValidated(true);

    sendComment({
      post_id: post._id,
      comment: textRef.current.value,
    });
  };
  useEffect(() => {
    setLiked(post.likes.includes(userId));
    setUpdateLike(post.likes);
  }, [post]);

  return (
    <div
      className="card text-center"
      style={{ maxWidth: "600px", margin: "20px", backgroundColor: "white" }}
    >
      <div className="card-header"></div>
      <div
        className="card-header"
        style={{
          height: "auto",
          display: "flex",
          alignItems: "left",
          marginTop: "0",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <div
          className="card-header-container"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar src={post.user.profilePic}></Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
              marginTop: "0",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{post?.user?.name}</div>
            <div style={{ fontSize: "14px" }}>
         {post?.user?.headline}
            </div>
          </div>
        </div>
        <div style={{ fontSize: "14px", textAlign: "left", marginTop: "10px" }}>
          {post.text}
        </div>
      </div>
      <div className="card-body"></div>
      <div
        className="card-footer text-muted"
        style={{ backgroundColor: "white", flexWrap: "wrap" }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            className="comment-container"
            onClick={handleCommentClick}
            style={{ borderRadius: "50px", cursor: "pointer" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", padding: "10px" }}
            >
              <InsertCommentIcon style={{ marginRight: "5px" }} />
              <div style={{ marginRight: "5px" }}>Comment</div>
            </div>
          </div>
          <div
            className="comment-container"
            onClick={likeButton}
            style={{ borderRadius: "50px", cursor: "pointer" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                padding: "10px",
              }}
            >
              <ThumbUpOffAltIcon
                style={{ marginRight: "5px" }}
                className={liked ? "highlight" : ""}
              />
              <div style={{ marginRight: "5px" }}>Like</div>
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            
            }}
          >
            <div style={{ marginRight: "5px" }}>{post.comments.length}</div>
            <div style={{ marginRight: "5px" }}>
              {post.comments.length === 1 ? "comment" : "comments"}
            </div>
            

            <div
              className="like_hover"
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              <div >{updateLike?.length}</div>
              <div>{updateLike?.length === 1 ? "like" : "likes"}</div>
            </div>
            <LikesModal show={modalShow} onHide={() => setModalShow(false)} post = {post}  updatelike={updateLike}/>
          </div>
          <div
            className="comment-container"
            onClick={handleCommentClick}
            style={{ borderRadius: "50px", cursor: "pointer" }}
          ></div>
        </div>

        {showCommentForm && (
          <div className="down-header">
            <CommentList comments={post.comments} post={post} />

            <div
              className="post-inbux-box"
              style={{ display: "flex", alignItems: "left", marginTop: "20px" }}
            >
              <Avatar src={Image} />
              <Form
                style={{ width: "100%", marginLeft: "10px" }}
                onSubmit={SendClick}
                validated={validated}
                value={commentary}
                onChange={handleCommentChange}
              >
                <Form.Group controlId="formBasicText">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Type your comment"
                    required
                    ref={textRef}
                  />
                </Form.Group>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                  className="comment-container"
                >
                  <button
                    style={{
                      display: "flex",
                      padding: "10px",
                      border: "none",
                      alignItems: "left",
                    }}
                    className="ButtonClassName"
                  >
                    <SendIcon style={{ marginRight: "5px" }} />
                    <div style={{ marginRight: "5px" }}>Send</div>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
