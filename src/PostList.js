import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Chip, Button } from "@mui/material";
import RedoIcon from "@mui/icons-material/Redo";
import "./PostList.css";

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

  const getUserStatus = (userId) => {
    if (userId % 6 === 0) {
      return "Platinum";
    } else if (userId % 3 === 0) {
      return "Gold";
    } else if (userId % 2 === 0) {
      return "Silver";
    } else {
      return "Diomand";
    }
  };

  const getUserStatusColor = (userId) => {
    if (userId % 6 === 0) {
      return "#87828c";
    } else if (userId % 3 === 0) {
      return "#e9d700";
    } else if (userId % 2 === 0) {
      return "#d2cfd6";
    } else {
      return "#993fff";
    }
  };

  const getUserStatusImage = (userId) => {
    if (userId % 6 === 0) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbq9kozFHiwbt2acqlRMPTwjVb_PgUcRe8S6Gxa6QjDA&s";
    } else if (userId % 3 === 0) {
      return "https://previews.123rf.com/images/liliwhite/liliwhite1502/liliwhite150200027/37140287-alt%C4%B1n-antika-desenli-alt%C4%B1n-%C3%BCye-rozeti.jpg";
    } else if (userId % 2 === 0) {
      return "https://previews.123rf.com/images/valentint/valentint1609/valentint160900095/61961558-silver-%C3%BCye-simgesi-beyaz-zemin-%C3%BCzerine-internet-d%C3%BC%C4%9Fmesine-bas%C4%B1n.jpg";
    } else {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgld39vbZ_eIJJH0yRucjGbKdSq0O8ABI6M30BqlFGug&s";
    }
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
                <Card
                  sx={{
                    height: viewMode === "list" ? "200px" : "350px",
                    marginBottom: "1,5rem",
                  }}
                  variant="outlined"
                >
                  <CardContent>
                    <div className="card-content">
                      <h3
                        className={`${
                          viewMode === "list"
                            ? "card-content-title-list"
                            : "card-content-title"
                        }`}
                      >
                        {post.title}
                      </h3>
                      <p
                        className={`${
                          viewMode === "list"
                            ? "card-content-body-list"
                            : "card-content-body"
                        }`}
                      >
                        {post.body}
                      </p>
                      <div className="card-content-badge">
                        {" "}
                        <Chip
                          sx={{ background: getUserStatusColor(post.userId) }}
                          label={getUserStatus(post.userId)}
                        />
                        <img
                          onClick={() => {
                            window.location.href = getUserStatusImage(
                              post.userId
                            );
                          }}
                          height={48}
                          width={48}
                          src={getUserStatusImage(post.userId)}
                          alt="User Status"
                        />
                        <Button
                          onClick={() => navigate(`/posts/${post.id}`)}
                          variant="contained"
                          endIcon={<RedoIcon />}
                        >
                          View Comments
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default PostList;
