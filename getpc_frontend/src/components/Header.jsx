function Header(props){
    return (
        <div id="header">
            <p id="header_title" style={{ width: '100%', textAlign: 'center', fontWeight: 700 }}>{props.title}</p>    
        </div>
    );
}

export default Header;
