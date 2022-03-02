import React from "react";
import PCDirs from "./components/PCDirs";
import FileStream from "./components/FileStream";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<PCDirs />} />
            <Route path="/stream" element={<FileStream />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
