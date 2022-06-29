function Logout() {
    const ctx = React.useContext(UserContext);
    
    React.useEffect(() => {
        ctx.setCurrentUser(-1);
        localStorage.setItem("currentUser", -1);
    }, []);
    


    return (
        <ReactRouterDOM.Redirect to="/"/>
    )
}

