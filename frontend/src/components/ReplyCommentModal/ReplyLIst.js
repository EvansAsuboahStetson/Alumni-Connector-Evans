import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./CommentList.css";
import SendIcon from "@mui/icons-material/Send";
import { Form } from "react-bootstrap";
import { PostReply } from "../../functions/userPosts";
import ReplyCard from "../ReplyCardComponent/ReplyCard";

function CommentList({ comments, post }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [showRepliesForComment, setShowRepliesForComment] = useState(null);

  const handleSubmit = async (event, commentId) => {
    event.preventDefault();
    const replyText = event.target.elements.formBasicText.value;
    const token = localStorage.getItem("token");

    try {
      const data = {
        post_id: post._id,
        comment: replyText,
        commentId: commentId,
      };
      const response = await PostReply(data, token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setShowReplyForm(false);
  };

  const changeName = (name) => {
    const nameArray = name.split(" ");
    const lastName = nameArray[nameArray.length - 1];
    return nameArray[0][0] + lastName[0][0];
  };

  const handleReplyClick = (commentId) => {
    setShowReplyForm(!showReplyForm);
    setReplyCommentId(commentId);
  };

  const handleShowReplies = (commentId) => {
    if (showRepliesForComment === commentId) {
      setShowRepliesForComment(null);
    } else {
      setShowRepliesForComment(commentId);
    }
  };

  return (
    <div className="loopComments">
      {comments.map((comment, index) => (
        <div key={index}>
          <div
            className="comment"
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Avatar className="post-avatar">
              {changeName(comment.user.name)}
            </Avatar>
            <div className="card" style={{ width: "38rem" }}>
              <div className="card-body">
                <div className="card-flex">
                  <h5 className="card-title">{comment?.user?.name}</h5>
                  <p className="card-text">
                    <p style={{ float: "left" }}>{comment?.text}</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="commentListContainer">
            <div className="commentList">
              <div
                className="reply-comment"
                style={{ cursor: "pointer" }}
                onClick={() => handleReplyClick(comment._id)}
              >
                Reply
              </div>
              <div className="separator"></div>
              <div className="like-comment" style={{ cursor: "pointer" }}>
                Like
              </div>
            </div>
            {comment.replies.length > 0 && (
              <button
                className="showReply"
                onClick={() => handleShowReplies(comment._id)}
              >
                {showRepliesForComment === comment._id
                  ? "Hide Replies"
                  : "Show Replies"}
              </button>
            )}
            {showRepliesForComment === comment._id && (
              <>
                {comment?.replies?.map((reply, index) => (
                  <div
                    key={index}
                    style={{ marginTop: "20px", paddingLeft: "120px" }}
                  >
                    <ReplyCard name={reply.name} replyText={reply.text} />
                  </div>
                ))}
              </>
            )}
          </div>
          {showReplyForm && replyCommentId === comment._id && (
            <div>
              <Form
                style={{
                  width: "80%",
                  marginLeft: "60px",
                  marginTop: "10px",
                  paddingLeft: "60px",
                }}
                onSubmit={(event) => handleSubmit(event, comment._id)}
              >
                <Form.Group controlId="formBasicText">
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Type your reply"
                    required
                  />
                </Form.Group>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                    marginTop: "10px",
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
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentList;
