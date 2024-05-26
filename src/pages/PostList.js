import axios from "axios";
import React, { useState, useEffect } from "react";
import { Grid, CardContent, Chip, Button } from "@mui/material";
import CardComponents from "../components/CardComponents";
import "../styles/PostList.css";
import { useNavigate } from "react-router-dom";
import RedoIcon from "@mui/icons-material/Redo";

const PostList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    axios
      .get("http://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const changeViewMode = (mode) => {
    setViewMode(mode);
  };

  const filterPosts = (post) => {
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const getUserStatus = (ids) => {
    if (ids % 6 === 0) {
      return "Platinum";
    } else if (ids % 3 === 0) {
      return "Gold";
    } else if (ids % 2 === 0) {
      return "Silver";
    } else {
      return "Diomand";
    }
  };

  const getUserStatusColor = (ids) => {
    if (ids % 6 === 0) {
      return "#87828c";
    } else if (ids % 3 === 0) {
      return "#e9d700";
    } else if (ids % 2 === 0) {
      return "#d2cfd6";
    } else {
      return "#993fff";
    }
  };

  const getUserStatusImage = (ids) => {
    if (ids % 6 === 0) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbq9kozFHiwbt2acqlRMPTwjVb_PgUcRe8S6Gxa6QjDA&s";
    } else if (ids % 3 === 0) {
      return "https://previews.123rf.com/images/liliwhite/liliwhite1502/liliwhite150200027/37140287-alt%C4%B1n-antika-desenli-alt%C4%B1n-%C3%BCye-rozeti.jpg";
    } else if (ids % 2 === 0) {
      return "https://previews.123rf.com/images/valentint/valentint1609/valentint160900095/61961558-silver-%C3%BCye-simgesi-beyaz-zemin-%C3%BCzerine-internet-d%C3%BC%C4%9Fmesine-bas%C4%B1n.jpg";
    } else {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgld39vbZ_eIJJH0yRucjGbKdSq0O8ABI6M30BqlFGug&s";
    }
  };
  const PostListCardContent = ({ title, body, id, userId }) => {
    return (
      <CardContent>
        <div className="card-content">
          <h3
            className={`${
              viewMode === "list"
                ? "card-content-title-list"
                : "card-content-title"
            }`}
          >
            {title}
          </h3>
          <p
            className={`${
              viewMode === "list"
                ? "card-content-body-list"
                : "card-content-body"
            }`}
          >
            {body}
          </p>
          <div className="card-content-badge">
            <Chip
              sx={{ background: getUserStatusColor(userId) }}
              label={getUserStatus(userId)}
            />
            <img
              onClick={() => {
                window.location.href = getUserStatusImage(userId);
              }}
              height={48}
              width={48}
              src={getUserStatusImage(userId)}
              alt="User Status"
            />
            <Button
              onClick={() => navigate(`/posts/${id}`)}
              variant="contained"
              endIcon={<RedoIcon />}
            >
              View Comments
            </Button>
          </div>
        </div>
      </CardContent>
    );
  };

  return (
    <div className="post-screen">
      <div className="main-search-button">
        <input
          className="postList-search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="postList-search-button"
          onClick={() => changeViewMode("list")}
        >
          List View
        </button>
        <button
          className="postList-search-button"
          onClick={() => changeViewMode("card")}
        >
          Card View
        </button>
      </div>
      <div>
        <h2>Post Cards</h2>
        <div className="card-container">
          <Grid container spacing={2}>
            {posts.filter(filterPosts).map((post) => (
              <Grid
                xs={viewMode === "list" ? 12 : 3}
                key={post.id}
                className="card"
              >
                <CardComponents
                  viewMode={viewMode}
                  content={
                    <PostListCardContent
                      title={post.title}
                      body={post.body}
                      userId={post.userId}
                      id={post.id}
                    />
                  }
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PostList;
