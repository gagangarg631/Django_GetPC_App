import { useNavigate } from "react-router-dom";

function BackButton(props){

    const navigate = useNavigate();

    const { dirStack, setDirStack, getDirs, activeScreen } = props;

    return (
        <img id="back_button" style={{ visibility: "hidden", zIndex: 1 }} src="back.png" onClick={(ev) => {
            
            let secLastPath = dirStack[dirStack.length - 1];
            if (activeScreen === "FILESTREAM"){
                console.log(secLastPath);
                navigate('/', { state: { path: secLastPath } })
            }

            if (dirStack.length <= 1) {
                ev.target.style.visibility = 'hidden';
            }
            setDirStack(dirStack.slice(0, dirStack.length - 1));
            getDirs(secLastPath)
        }}
            alt=""
        />
    )
}

export default BackButton;