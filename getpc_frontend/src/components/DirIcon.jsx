import React from "react";

function DirIcon(props) {


    
    return (
        <div style={styles.dir_icon} onClick={() => { props.clicked(props.title) }}>
            <span style={styles.icon_thumb}> </span>
            <span style={{fontWeight: 'bold'}}>{props.title}</span>
        </div>
       
    )
}

const styles = {
    dir_icon: {
        width: 120,
        height: 150,
        border: '1px solid black',
        display: 'inline-block',
        margin: 5,
    },

    icon_thumb: {
        width: 100, 
        height: 100,
        backgroundColor: 'orange', 
        display: "inline-block",
    }
}

export default DirIcon;