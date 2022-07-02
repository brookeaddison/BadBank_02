function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

// Validates that email is in email format:
function validateEmail (email) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      setStatus('Error: invalid email ');
      setTimeout(() => setStatus(''),3000);
      return false;
      }
    return true;
  }

// Validates Password is at least 8 characters: 
function validatePassword (password) {
  if (/.{8,}/.test(password) === false) {
      setStatus('Error: password must be at least 8 characters ');
      setTimeout(() => setStatus(''),5000);
      return false;
  }
  return true;
}

// Validate that the form is filled out:
  function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }
  

// Creates account if all validations are passed:
  async function handleCreate(){
    // console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validateEmail(email, 'email')) 
    return;
    if (!validatePassword(password, 'password')) return;
    //ctx.users.push({name,email,password,balance:100});

    //making a copy of ctx.users
    ctx.setUsers([...ctx.users,{name,email,password,balance: 100}]);
    
    //Write this to server
    const response = await fetch(`/account/create/${name}/${email}/${password}`)
      /*method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({name,email,password,balance: 100}),

    })
    */
    //window.localStorage.setItem("users", JSON.stringify([...ctx.users,{name,email,password,balance:100}]))
    // console.log([...ctx.users,{name,email,password,balance:100}])
    let responseData = await response.json();
    console.log(responseData);
    setShow(false);
  }    

// Clears the form:
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      
      bgcolor="secondary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="me@example.com" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
              </>
            ):(
              
              <>
              <ReactRouterDOM.Redirect to="/login/"/>
              <h5>Success!</h5>
              <button type="submit" className="btn btn-light">Add another account</button>
              </>
            )}
    />
  )
}