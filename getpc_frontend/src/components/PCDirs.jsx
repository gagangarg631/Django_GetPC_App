import React, { useEffect, useState } from "react";
import DirIcon from "./DirIcon";
import AudioElement from "./AudioElement";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { getToken, streamUrl, downloadDirUrl } from "../util";
import { useLocation } from "react-router-dom";


function PCDirs(props) {

    const { dirs, setDirs, dirStack, setDirStack, getDirs, currentPath, setCurrentPath, setActiveScreen } = props;

    const navigate = useNavigate();

    const { state } = useLocation();

    let path;
    state ? path=state.path : path="";

    useEffect(() => {
        setActiveScreen("PCDIRS");
        path ? getDirs(path) : getDirs();
    }, []);


    return (
        <div>
            <div id="play_media"></div>
            <div style={styles.pcdir_style}>
                {
                    dirs.map((dirObj, index) => {

                        if (dirObj.dir_name[0] !== '.') {
                            return <DirIcon
                                key={index}
                                dirObj={dirObj}
                                download={(obj) => {
                                    let newPath = currentPath + "/" + obj.name;
                                    fetch(downloadDirUrl, {
                                        method: 'POST',
                                        body: JSON.stringify({ dirPath: newPath }),
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
                                    document.getElementById('back_button').style.visibility = 'visible';
                                    setDirStack([...dirStack, currentPath])
                                    let newPath = currentPath + "/" + obj.name;

                                    if (obj.type === undefined) {
                                        // it's a directory
                                        getDirs(newPath)
                                    } else if (obj.type === 'video') {
                                        // it's a video file
                                        let vid_list = dirs.filter((item) => {
                                            
                                            if (item['dir_type'] && item['dir_type'].split("/")[0] === 'video')
                                                return true;
                                            else
                                                return false;
                                        })

                                        navigate('/stream', { state: { obj: obj, currentPath: currentPath, video_list: vid_list } })
                                    } else if (obj.type === 'audio') {
                                        // it's an audio file
                                        getToken(newPath).then(token => {
                                            let pl_md = document.getElementById('play_media');

                                            ReactDOM.render(
                                                <AudioElement
                                                    removeMe={() => {
                                                        // play close animation
                                                        pl_md.classList.add('audio_close_anim');

                                                        // unmount audio_player from react dom
                                                        setTimeout(() => {
                                                            ReactDOM.unmountComponentAtNode(pl_md);
                                                            pl_md.classList.remove('audio_start_anim');
                                                            pl_md.classList.remove('audio_close_anim');
                                                            pl_md.style.transform = 'translate(0,-54px)';
                                                        }, 500)
                                                    }}

                                                    audio_src={streamUrl + token}
                                                />,
                                                pl_md
                                            )

                                            if (pl_md.style.transform != 'translate(0px, 0px)') {
                                                pl_md.style.transform = 'translate(0,-54px)';
                                                pl_md.classList.add('audio_start_anim');
                                                setTimeout(() => { pl_md.style.transform = 'translate(0,0px)'; }, 500);
                                            }
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
        margin: '0 auto',

    }
}

export default PCDirs;
