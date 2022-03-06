function VideoCard(props) {
    let current = props.current_video.name === props.title;
    let color = current ? 'gray':'white';
    let video_status = current ? 'video_playing' : '';
    return (
        <div className={`video_card ${ video_status }`} style={{ backgroundColor: color }} onClick={ props.play }>
            {/* <img src={props.thumbnail} alt="" /> */}
            <p className="video_card_title">{props.title}</p>
        </div>
    );
}

export default VideoCard;