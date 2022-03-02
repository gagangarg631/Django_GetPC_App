import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

function FileStream(props) {
    const { state } = useLocation();
    
    const { type, filePath } = state;

    const [fileSrc, setFileSrc] = useState("");

    const getToken = async (filePath) => {
        let url = `http://192.168.29.246:8000/api/getStreamToken/`;
        let streamUrl = `http://192.168.29.246:8000/api/stream/`;

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({'filePath': filePath}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(res => {
            setFileSrc(streamUrl + res['token'])
        })
    }

    const downloadFile = () => {
            fetch(`http://192.168.29.246:8000/api/downloadFile/`, {
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
    
    useEffect(() => {
        getToken(filePath);
    }, [])

    return (
        <div style={{width: '80vw', height: '80vh', margin: '30px auto', border: '1px solid black', display: 'flex', justifyContent: 'center'}}>
            
            <video src={fileSrc} width="100%" height="100%" type="video/mp4" autoPlay controlsList="nodownload" controls></video>
            <button style={{backgroundColor: 'orange', fontSize: 30}} onClick={downloadFile}><strong>Download</strong></button>
        </div>
    );
}

export default FileStream;