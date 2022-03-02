import React from "react";
import '../index.css'

function DirIcon(props) {
    let obj = props.dirObj;

    let icon_thumb;
    let title = obj.dir_name;
    
    const [type,ext] = obj.dir_type ? obj.dir_type.split("/") : [];

    if (type == "audio")
        icon_thumb = "thumbnails/audio.png";
    else if (type == "video")
        icon_thumb = "thumbnails/vid.png";
    else
        icon_thumb = "thumbnails/folder.png";

        // title.slice(0,title.indexOf("."))

    return (
        <div style={styles.dir_icon} onClick={() => { props.clicked({
            name: title,
            type,
            ext,
        }) }}>
            <img style={styles.icon_thumb} src={icon_thumb} alt="" />
            <div style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20%', fontSize: 18 }}>{title}</div>
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