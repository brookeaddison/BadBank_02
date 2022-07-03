function NavBar() {
  const ctx = React.useContext(UserContext);

  return (
    //<div className="d-flex">
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
      <a className="navbar-brand" href="#">
        BadBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {ctx.currentUser == -1 && (
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">
                Create Account
              </a>
            </li>
          )}
          {ctx.currentUser == -1 && (
            <li className="nav-item">
              <a className="nav-link" href="#/login/">
                Login
              </a>
            </li>
          )}
          {ctx.currentUser != -1 && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="#/deposit/">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
              {/* <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li> */}
            </>
          )}
          {ctx.currentUser != -1 &&
            ctx.users[ctx.currentUser].role == "employee" && (
              <li className="nav-item">
                <a className="nav-link" href="#/alldata/">
                  AllData
                </a>
              </li>
            )}
          {ctx.currentUser != -1 && (
            <li className="nav-item">
              <a className="nav-link" href="#/logout">
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
      <div style={{ marginLeft: "auto" }} 
      className="align-self-center text-light">
        {ctx.currentUser != -1 && ctx.users[ctx.currentUser].email}
      </div>
    </nav>
  );
}
