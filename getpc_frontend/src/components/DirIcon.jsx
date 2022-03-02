import React from "react";
import '../index.css'

function DirIcon(props) {
    let icon_thumb;
    let title = props.title;
    
    if (title.endsWith(".mp3"))
        icon_thumb = "thumbnails/audio.png";
    else if (title.endsWith(".mp4"))
        icon_thumb = "thumbnails/vid.png";
    else
        icon_thumb = "thumbnails/folder.png";

    title = title.slice(0, title.indexOf("."))

    return (
        <div style={styles.dir_icon} onClick={() => { props.clicked(props.title) }}>
            <img style={styles.icon_thumb} src={icon_thumb} alt="" />
            <div style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20%', fontSize: 18 }}>{title.slice(0, 10)}</div>
        </div>
       
    )
}

const styles = {
    dir_icon: {
        width: 120,
        height: 150,
        // border: '1px solid black',
        display: 'inline-block',
        margin: 5,
    },

    icon_thumb: {
        width: '100%', 
        height: '70%',
        display: "inline-block",
        // border: '1px solid blue',
    },

    icon_title: {
        
    }
}

export default DirIcon;