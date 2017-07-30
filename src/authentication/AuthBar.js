import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthService from './auth.service';

import './AuthBar.css';

function AuthBarAuthenticated(props) {
  return (
    <div>
      Hello {props.userName}. <button onClick={props.signOut}>Sign out</button>
    </div>
  );
}
AuthBarAuthenticated.propTypes = {
  signOut: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

function AuthBarUnauthenticated(props) {
  return (
    <div>
      You must sign in in order to join any bars. <button onClick={props.signIn}>Sign in</button>
    </div>
  );
}
AuthBarUnauthenticated.propTypes = {
  signIn: PropTypes.func.isRequired,
};

class AuthBar extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: false,
    };

    AuthService.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          userName: user.displayName,
          email: user.email,
          authError: null,
        });
      } else {
        this.setState({
          authenticated: false,
          authError: null,
        });
      }
    });

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = AuthService.getGoogleProvider();
    AuthService.signIn(provider).catch((error) => {
      this.setState({
        authError: error,
      });
    });
  }

  signOut() {
    AuthService.signOut();
  }

  render() {
    return (
      <div className="auth-bar">
        <div className="container">
          {this.state.authError ? this.state.authError : null}
          {this.state.authenticated
            ? <AuthBarAuthenticated signOut={this.signOut} userName={this.state.userName} />
            : <AuthBarUnauthenticated signIn={this.signIn} />}
        </div>
      </div>
    );
  }
}

export default AuthBar;
