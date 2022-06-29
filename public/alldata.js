
function AllData(){
  
  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
    .then(response => response.json())
    .then(data     => {
      console.log(data);
      //setData(JSON.stringify(data));
      setData(data);
    });
  }, []);

  
  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((user, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.balance}</td>
              </tr>
            )
          })
        }
        
      </tbody>
    </table>
  )}