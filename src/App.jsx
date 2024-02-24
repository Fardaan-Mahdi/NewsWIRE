import React , {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/NavBar";
import News from "./components/News";

function App() {
  const pageSize=12;
  // const apiKey="f46b05484f864cc7b32735bbe76de782";
  const apiKey="b3a3a122c86a41c689b616a89ddcefae";
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div>
        <Navbar onSearch={handleSearch}/>
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={pageSize} country="in" category="general" searchQuery={searchQuery} apiKey={apiKey} />} />
          
          <Route exact path="/general" element={<News key="general" pageSize={pageSize} country="in" category="general" searchQuery={searchQuery} apiKey={apiKey} />} />

          <Route exact path="/business" element={<News key="business" pageSize={pageSize} country="in" category="business" searchQuery={searchQuery} apiKey={apiKey} />} />
          
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country="in" category="entertainment" searchQuery={searchQuery} apiKey={apiKey}/> } />
          
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} country="in" category="health"  searchQuery={searchQuery} apiKey={apiKey}/>} />
          
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} country="in" category="science" searchQuery={searchQuery} apiKey={apiKey}/> } />
          
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country="in" category="sports"  searchQuery={searchQuery} apiKey={apiKey}/>} />
          
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country="in"  searchQuery={searchQuery} apiKey={apiKey} category="technology" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
