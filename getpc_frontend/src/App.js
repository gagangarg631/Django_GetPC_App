import React, { useState } from "react";
import PCDirs from "./components/PCDirs";
import FileStream from "./components/FileStream";
import Header from "./components/Header";
import BackButton from "./components/BackButton";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css';
import { dirsUrl } from "./util";


function App() {
  
  const [dirs, setDirs] = useState([]);
  const [dirStack, setDirStack] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [activeScreen, setActiveScreen] = useState("");

  const getDirs = (dirPath = null) => {
    let url = dirsUrl;

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ "dirPath": dirPath }),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(res => {

        setDirs(res['result']);
        setCurrentPath(res['current_path'])

    }).catch(err => {
        console.log(err);
    })
}

  return (
    <div className="App">
      <Header title="My PC Files"/>
      <BrowserRouter>
        <BackButton dirStack={dirStack} setDirStack={setDirStack} getDirs={getDirs} activeScreen={activeScreen} />
        <Link id="home_link" to="/"></Link>
        <Routes>
          <Route exact path="/" element={<PCDirs dirs={dirs} setDirs={setDirs} getDirs={getDirs} dirStack={dirStack} setDirStack={setDirStack} currentPath={currentPath} setCurrentPath={setCurrentPath} setActiveScreen={setActiveScreen}/>} />
          <Route path="/stream" element={<FileStream setActiveScreen={setActiveScreen} />} />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
