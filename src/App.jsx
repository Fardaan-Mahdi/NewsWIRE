import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

function App() {
  const pageSize = 12;
  const [progress, setProgress] = useState(10);
  const apiKey = "f46b05484f864cc7b32735bbe76de782";
  // const apiKey="b3a3a122c86a41c689b616a89ddcefae";
  // const apiKey="cf45cee3f1d94996bd6c73128274400f";
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div>
        <LoadingBar color="#f11946" height={3} progress={progress} />
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country="in"
                category="general"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                country="in"
                category="business"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={pageSize}
                country="in"
                category="entertainment"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                country="in"
                category="health"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pageSize}
                country="in"
                category="science"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                country="in"
                category="sports"
                searchQuery={searchQuery}
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pageSize}
                country="in"
                searchQuery={searchQuery}
                apiKey={apiKey}
                category="technology"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
