import { useNavigate } from "react-router-dom";

function BackButton(props) {

    const navigate = useNavigate();

    const { dirStack, setDirStack, getDirs, activeScreen } = props;

    const goBack = (ev) => {

        let secLastPath = dirStack[dirStack.length - 1];
        if (activeScreen === "FILESTREAM") {
            navigate('/', { state: { path: secLastPath } })
        }

        if (dirStack.length <= 1) {
            ev.target.style.display = 'none';
        }
        setDirStack(dirStack.slice(0, dirStack.length - 1));
        getDirs(secLastPath)
    }

    return (
        <div onClick={goBack} id="back_button" style={{
            alignItems: 'center',
            backgroundColor: 'aliceblue',
            display: 'none',
            zIndex: 1,
        }}>
            <img src="back.png" alt="" />
        </div>
    )
}

export default BackButton;