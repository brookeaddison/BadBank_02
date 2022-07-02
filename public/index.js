function Spa() {

  const [users, setUsers] = React.useState([]);
  
  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
    .then(response => response.json())
    .then(data     => {
      console.log(data);
      //setData(JSON.stringify(data));
      setUsers(data);
    });
  }, []);


  // indicates index of current user (person logged  in)
  let value = localStorage.getItem("currentUser");
  value = +value || -1;
  const [currentUser, setCurrentUser] = 
  React.useState(value);
  return (
    <HashRouter>
      <div>
               
        <UserContext.Provider value={{users, setUsers, currentUser, setCurrentUser}}>
        <NavBar/>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
            <Route path="/logout/" component={Logout} />

          </div>
          
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Spa/>);
