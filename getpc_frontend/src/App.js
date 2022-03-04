import React from "react";
import PCDirs from "./components/PCDirs";
import FileStream from "./components/FileStream";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css';


function App() {
  
  return (
    <div className="App">
      <Header title="My PC Files"/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PCDirs />} />
          <Route path="/stream" element={<FileStream />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
