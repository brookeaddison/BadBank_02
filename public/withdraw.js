function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext); 
  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

  function WithdrawMsg(props){
    return(<>
      <h5>Success</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Withdraw again
      </button>
    </>);
  }

  function WithdrawForm(props){
    const [email, setEmail]   = React.useState('');
    const [amount, setAmount] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
  async function handle(){
    console.log('withdraw handle function');
    const user  = ctx.users[ctx.currentUser];
    const email = user.email;
    //ctx.users.find((user) => user.email == email);
    // if (!user) {
    //   props.setStatus('fail!')      
    //   return;      
    // }
    console.log(email, amount);
    let response = await fetch(`/account/withdraw/${email}/${amount}`);
    let result = await response.json();
    console.log('result: ', result);
    user.balance = user.balance - Number(amount);
    console.log(user);
    props.setStatus('');      
    props.setShow(false);
  }
  console.log("currentUser = " , ctx.users[ctx.currentUser]);
  console.log(ctx.currentUser);
  console.log("balance = " , ctx.currentUser.balance);

  return(<>

    {/* Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/> */}

    Amount<br/>
    <input type="number"
      min="0" 

      max={ctx.users[ctx.currentUser].balance}  
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      disabled={ctx.users[ctx.currentUser].balance <= 0}
      onClick={handle}>
        Withdraw
    </button>
    <h3 style={{margin: "2px"}}>
      Balance: <label>
      {ctx.users[ctx.currentUser].balance}
      </label>
    </h3>
  </>);
}
