import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./PostList";
import PostDetail from "./PostDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
