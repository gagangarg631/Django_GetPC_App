function AudioElement(props){
    return (
        <div style={{border: '1px solid black', height: 80, width: 300}}>
            <audio src={props.audio_src} autoPlay controls></audio>
            <button>Download Music</button>
        </div>
    );
}

export default AudioElement;