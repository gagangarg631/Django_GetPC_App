import React, { useEffect, useState } from "react";
import DirIcon from "./DirIcon";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";


function PCDirs() {
    const [dirs, setDirs] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [dirStack, setDirStack] = useState([]);
    const navigate = useNavigate();

    const [audioSrc, setAudioSrc] = useState("");

    const getDirs = (dirPath=null) => {
        let url = `http://192.168.29.246:8000/api/dirs/`;
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({"dirPath": dirPath}),
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

    

    useEffect(() => {
        getDirs();
    }, []);

    
    return (
        <div>
            <button onClick={() => {
                    let secLastPath = dirStack[dirStack.length - 1];
                    setDirStack(dirStack.slice(0, dirStack.length-1));
                    getDirs(secLastPath)
                }}>Back</button>

            <div style={styles.pcdir_style}>
                {
                    dirs.map((dirObj, index) => {

                        if (dirObj.dir_name[0] !== '.'){
                            return <DirIcon
                                        key={index} 
                                        dirObj={dirObj} 
                                        clicked={async (obj) => {
                                            
                                            setDirStack([...dirStack, currentPath])
                                            let newPath = currentPath + "/" + obj.name;
                                            console.log(obj.type)
                                            if (obj.type === undefined){
                                                // it's a directory
                                                getDirs(newPath)
                                            }else if (obj.type == 'video'){
                                                // it's a video file
                                                navigate('/stream', { state: { type: obj.type, filePath: newPath } })
                                            }else if (obj.type == 'audio'){
                                                // it's an audio file
                                            }
                                        }}
                                    />
                        }
                    })
                }
            </div>
        </div>
    )
}

const styles = {
    pcdir_style: {
        border: '1px solid black', 
        margin: '20px auto',
        
    }
}

export default PCDirs;