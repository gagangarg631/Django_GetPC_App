import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getToken, streamUrl, downloadUrl } from "./../util";

function FileStream(props) {
    const { state } = useLocation();
    
    const { type, filePath } = state;

    const [fileSrc, setFileSrc] = useState("");

    

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
        <div style={{width: '80vw', height: '80vh', margin: '30px auto', border: '1px solid black', display: 'flex', justifyContent: 'center'}}>
            
            <video src={fileSrc} width="100%" height="100%" type="video/mp4" autoPlay controlsList="nodownload" controls></video>
            <button style={{backgroundColor: 'orange', fontSize: 30}} onClick={downloadFile}><strong>Download</strong></button>
        </div>
    );
}

export default FileStream;