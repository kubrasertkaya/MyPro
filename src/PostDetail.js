import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  console.log("comment", comments);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedCommentBody, setEditedCommentBody] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    axios
      .get(`http://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

  const handleDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleEdit = (commentId) => {
    const comment = comments.find((comment) => comment.id === commentId);
    setEditedCommentBody(comment.body);
    setEditCommentId(commentId);
  };

  const handleEditSubmit = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, body: editedCommentBody }
          : comment
      )
    );
    setEditCommentId(null);
    setEditedCommentBody("");
  };

  const handleAddComment = () => {
    if (title.length === 0 || body.length === 0) {
      setError("Name and Comment cannot be empty!");
      return;
    }
    const newComment = {
      id: Math.floor(Math.random() * 1000),
      name: title,
      body: body,
    };
    setComments([newComment, ...comments]);
    setTitle("");
    setBody("");
    setShowInputs(false);
    setError("");
  };

  const handleButtonClick = () => {
    setShowInputs(true);
  };

  return (
    <div className="detail-main">
      <div className="detail-screen">
        <div>
          {!showInputs && (
            <button
              className="add-new-comment-button"
              onClick={handleButtonClick}
            >
              Add New Comment
            </button>
          )}

          {showInputs && (
            <div className="comment-container">
              <h2>Add New Comment</h2>
              <div className="form-comment-container">
                <label className="comment-label">Name:</label>
                <input
                  className="add-comment-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="comment-label">Comment:</label>
                <textarea
                  className="add-comment-input"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </div>
              <button className="add-comment-button" onClick={handleAddComment}>
                Add Comment
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </div>
        {post && (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        )}
        <div>
          <h3>Comments</h3>
          <div className="main-comments">
            <Grid container spacing={2}>
              {comments.map((comment) => (
                <Grid xs={4} key={comment.id} className="card">
                  <Card
                    sx={{ minHeight: "150px", marginBottom: "1,5rem" }}
                    variant="outlined"
                  >
                    <CardContent>
                      <p className="comment-card-content">
                        <strong>{comment.name}:</strong>
                      </p>

                      {editCommentId === comment.id ? (
                        <div>
                          <input
                            type="text"
                            value={editedCommentBody}
                            onChange={(e) =>
                              setEditedCommentBody(e.target.value)
                            }
                          />
                          <button
                            className="save-button"
                            onClick={() => handleEditSubmit(comment.id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <p>{comment.body}</p>
                      )}
                      <div className="edit-delete-button">
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleEdit(comment.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleDelete(comment.id)}
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
