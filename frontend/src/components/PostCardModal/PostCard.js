import { Avatar, AvatarGroup } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Image from "./avatar.jpg";
import { Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import "./PostCard.css";
import { updateUserPost } from "../../functions/userPosts";
import CommentList from "../ReplyCommentModal/ReplyLIst";

function PostCard({ post }) {
  const textRef = useRef(post?.comment);

  const [commentary, setCommentary] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const [validated, setValidated] = useState(false);

  const sendComment = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await updateUserPost(data, token);
    } catch (err) {
      console.log(err);
    }
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
    console.log(post);
  }, [post]);

  return (
    <div
      className="card text-center"
      style={{ maxWidth: "600px", margin: "20px", backgroundColor: "white" }}
    >
      <div className="card-header">People who like</div>
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
          <Avatar src={Image}></Avatar>
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
              Computer Engineering 24' | Stanford (d.school) University
              Innovation Fellow | NSBE | Career Pathways Academy Ambassador |
              NSYP Participant
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
        style={{ backgroundColor: "white" }}
      >
        <div style={{ display: "flex" }}>
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
            onClick={handleCommentClick}
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
              <ThumbUpOffAltIcon style={{ marginRight: "5px" }} />
              <div style={{ marginRight: "5px" }}>Like</div>
            </div>
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
