import React, { useEffect, useState } from "react";
import DirIcon from "./DirIcon";


function PCDirs() {
    const [dirs, setDirs] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [dirStack, setDirStack] = useState([]);
    const [vid, setVid] = useState("");

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
            setDirs(res['result'].sort());
            setCurrentPath(res['current_path'])
            console.log(res['result'])
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
                    dirs.map((dirName, index) => {

                        if (dirName[0] !== '.'){
                            return <DirIcon
                                        key={index} 
                                        title={dirName} 
                                        clicked={(clicked_dir) => {
                                            setDirStack([...dirStack, currentPath])
                                            let newPath = currentPath + "/" + clicked_dir;
                                            getDirs(newPath)
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