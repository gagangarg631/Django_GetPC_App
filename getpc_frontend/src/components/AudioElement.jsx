function AudioElement(props){
    return (
        <div id="audio_player">
            <img src="cross.png" onClick={ props.removeMe } alt="" />
            <audio src={props.audio_src} autoPlay controls></audio>
        </div>
    );
}

export default AudioElement;