function Login() {
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(email, password);
    if (!validateEmail(email, "email"))
      return clearForm(alert("Invalid Email!"));
    if (!validate(password, "password")) return;

    const loginUser = ctx.users.find((userInfo) => {
      return userInfo.email === email;
    });

    console.log("found user: ", loginUser);
    if (!loginUser || loginUser.password !== password) {
      return alert("Incorrect email or passowrd!");
    }

    ctx.setCurrentUser(ctx.users.indexOf(loginUser));
    setShow(false);

    // const history  = React.useHistory();
    // const location = React.useLocation();
    // const { state: { referrer }} = location;
    //ReactRouterDOM.useHistory().push("/");
    //window.location = "/";
    localStorage.setItem("currentUser", ctx.currentUser);
    //history.push({pathname: "/"});
    //return <ReactRouterDOM.Redirect to="/"/>
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCreate}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <ReactRouterDOM.Redirect to="/" />
            <h5>Success!</h5>
            <button type="submit" className="btn btn-light">
              Success
            </button>
          </>
        )
      }
    />
  );
}
