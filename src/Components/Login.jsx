import React from 'react'
import { useState } from 'react';
import { Container, Typography, Box } from '@material-ui/core'
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom'
import './components.css';



const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const history=useHistory();
  
  const handleValidation = (event) => {

    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
      history.push('/home')
    }
        
  };


  return (
    <Container maxWidth="sm" className="neuro2">
       
      <Box my={16}>
      <br></br>
        <Typography variant="h3" component="h2" align="center">
          Admin Login
        </Typography>
        <br></br>
        <br></br>
        <br></br>
        <Typography align="center">
        <div className="Login">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-6">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                 
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-primary" onClick={handleValidation} >
                Login
              </button>
             
            </form>
            <br></br>
          </div>
         
        </div>
      </div>
    </div>

          
          </Typography>
      </Box>
    </Container>
  )
}

export default Login;
