import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

function App() {
  const pageSize = 12;
  const [progress, setProgress] = useState(10);

  const apiKey = import.meta.env.VITE_NEWS_API;
  // const apiKey = "b3a3a122c86a41c689b616a89ddcefae";

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const [categoryUpdate,setCategoryUpdate]=useState('General');

  function getData(data){
    setCategoryUpdate(data.charAt(0).toUpperCase() +
    data.slice(1));
  }
  return (
    <Router>
      <div>
        <LoadingBar color="#f11946" height={3} progress={progress} />
        <Navbar onSearch={handleSearch} categoryUpdate={categoryUpdate} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News getData={getData}
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
              <News getData={getData}
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
              <News getData={getData}
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
              <News getData={getData}
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
              <News getData={getData}
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
              <News getData={getData}
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
              <News getData={getData}
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
              <News getData={getData}
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
