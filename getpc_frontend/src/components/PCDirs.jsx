import React, { useEffect, useState } from "react";
import DirIcon from "./DirIcon";
import AudioElement from "./AudioElement";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { getToken, streamUrl, downloadDirUrl, dirsUrl } from "../util";

function PCDirs() {
    const [dirs, setDirs] = useState([]);
    const [currentPath, setCurrentPath] = useState("");
    const [dirStack, setDirStack] = useState([]);
    const navigate = useNavigate();

    const getDirs = (dirPath=null) => {
        let url = dirsUrl;
        
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
            <div id="play_media"></div>
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
                                        download = {(obj) => {
                                            let newPath = currentPath + "/" + obj.name;
                                            fetch(downloadDirUrl, {
                                                method: 'POST',
                                                body: JSON.stringify({dirPath: newPath}),
                                                mode: 'cors',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                }
                                            }).then(res => res.blob()).then(blob => {
                                                const newBlob = new Blob([blob]);
                                                const blobUrl = window.URL.createObjectURL(newBlob);
                                
                                                const link = document.createElement('a');
                                                link.href = blobUrl;
                                                link.setAttribute('download', `download.zip`);
                                                document.body.appendChild(link);
                                                link.click();
                                                link.parentNode.removeChild(link);
                                
                                                // clean up Url
                                                window.URL.revokeObjectURL(blobUrl);
                                            });
                                        }}
                                        clicked={async (obj) => {
                                            
                                            setDirStack([...dirStack, currentPath])
                                            let newPath = currentPath + "/" + obj.name;
                                            
                                            if (obj.type === undefined){
                                                // it's a directory
                                                getDirs(newPath)
                                            }else if (obj.type === 'video'){
                                                // it's a video file
                                                navigate('/stream', { state: { type: obj.type, filePath: newPath } })
                                            }else if (obj.type === 'audio'){
                                                // it's an audio file
                                                getToken(newPath).then(token => {
                                                    ReactDOM.render(<AudioElement audio_src={streamUrl + token} />,
                                                            document.getElementById('play_media'))
                                                })
                                                
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