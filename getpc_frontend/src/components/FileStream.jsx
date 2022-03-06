import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getToken, streamUrl, downloadUrl } from "./../util";
import VideoCard from "./VideoCard";

function FileStream(props) {
    const { state } = useLocation();
    
    const { obj, currentPath, video_list } = state;

    const [fileSrc, setFileSrc] = useState("");

    let filePath = currentPath + "/" + obj.name;

    const downloadFile = () => {
            fetch(downloadUrl, {
                method: 'POST',
                body: JSON.stringify({'filePath': filePath}),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
                
            }).then(res => res.blob()).then(blob => {
                const newBlob = new Blob([blob]);
                const blobUrl = window.URL.createObjectURL(newBlob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', `download.mp4`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                // clean up Url
                window.URL.revokeObjectURL(blobUrl);
            });
    }
    
    useEffect(async () => {
        let token = await getToken(filePath);
        setFileSrc(streamUrl + token)
    }, [])

    return (
        <div style={{backgroundColor: 'white',width: '99vw', border: '1px solid black' }}>
            
            <div id="video_running">
                <video src={fileSrc} id="video_play" width="100%" height="100%" type="video/mp4" preload="auto" controlsList="nodownload" controls></video>    
                <p className="video_running_title">{obj.name}</p>
            </div>
            <div id="video_list">
                {
                    video_list.map((item, index) => {
                        
                        return <VideoCard current_video={obj} key={index} title={item['dir_name']} play={async (ev) => {

                            let playing_vid = document.querySelector('.video_playing');
                            playing_vid.classList.remove('video_playing');
                            playing_vid.style.backgroundColor = 'white';

                            let target = ev.target.closest('.video_card');
                            target.classList.add('video_playing');
                            target.style.backgroundColor = 'gray';

                            let token = await getToken(currentPath + "/" + item['dir_name']);
                            setFileSrc(streamUrl + token);
                            document.getElementById('video_play').play();
                        }} />
                    })
                }
            </div>
        </div>
    );
}

export default FileStream;