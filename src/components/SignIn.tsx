import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import useHandlder from './configHandler/useHandler';

import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

const SignUp = () => {
  const { userPool } = useHandlder();

  let history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
    error: undefined
  });

  const { username, password, error } = state;
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var authenticationData = {
      Username: username,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: userPool
    };

    const congnitoUser = new CognitoUser(userData)

    congnitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        setState({
          ...state,
          username: '',
          password: ''
        })
        if (result) {
          history.push("/");
          window.location.reload();
        }

      },
      onFailure(err) {
        const { message } = err;
        setState({ ...state, error: message })
      }
    })

  }


  return <div className="App">
    <h1 style={{ textAlign: 'center' }}>SignIn Test</h1>
    <div className="row center-align formbody">
      <form className="col s12" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s4 offset-s4">
            <input
              value={username || ""}
              onChange={handleChange}
              placeholder="Username"
              id="username"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s4 offset-s4">
            <input
              type="password"
              value={password || ""}
              onChange={handleChange}
              placeholder="password"
              id="password"
            />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          disabled={!state.username}
        >
          Submit
         </button>
      </form>

      <div className="row center-align formbody">
        Don't have an account? <a href="/signup">Signup</a>
      </div>
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}
    </div>
  </div>
}

export default SignUp;
