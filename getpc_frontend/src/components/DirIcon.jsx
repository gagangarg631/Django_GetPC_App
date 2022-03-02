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

    let show_title = title.match('[ -.]') ? title.slice(0, title.match('[ -.]').index) : title
    const currObj = { name: title, type, ext };

    return (
        <div className="dirIconCard" 
        
        onMouseOver={(ev) => {
            let head = ev.target.closest(".dirIconCard");
            let d_icon = head.querySelector(".download_icon");
            d_icon.style.visibility = 'visible';

            let titleEl = head.querySelector(".title");
            titleEl.innerText = title;
        }} 
        
        onMouseOut={(ev) => {
            let head = ev.target.closest(".dirIconCard");
            let d_icon = head.querySelector(".download_icon");
            d_icon.style.visibility = 'hidden';

            let titleEl = head.querySelector(".title");
            titleEl.innerText = show_title;
        }}
        
        style={styles.dir_icon} onClick={() => props.clicked(currObj) }
        >
            <img className="download_icon" onClick={() => props.download(currObj)} style={{position: 'absolute', right: 0, visibility: 'hidden'}} width="25" src="download_icon.png" alt="" />
            <img style={styles.icon_thumb} src={icon_thumb} alt="" />
            <div className="title" style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, overflowWrap: 'anywhere' }}>
                {show_title}
            </div>

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
        position: 'relative',
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