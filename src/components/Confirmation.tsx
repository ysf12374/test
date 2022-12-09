import React, { useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useHistory } from "react-router-dom";
import useHandlder from './configHandler/useHandler';

const Confirmation = () => {
  const history = useHistory();
  const { userPool } = useHandlder();

  const [state, setState] = useState({
    username: "",
    verification: "",
    error: ""
  })

  const { username, verification, error } = state;
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verification, true, (err, result) => {
      if (err) {
        setState({ ...state, error: err?.message })
      }
      else { history.push('/signin') }
    })

    setState({
      username: "",
      verification: ""
    })
  }
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Confirmation Test</h1>
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
                value={verification || ""}
                onChange={handleChange}
                placeholder="verification"
                id="verification"
              />
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            disabled={!username}
            name="action"
          >
            Submit
          </button>
        </form>
        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
      </div>
    </div>
  )
}

export default Confirmation;
