import React, { useContext } from 'react'
import Home from './Home'
import Login from './Login'
import AppBar from './AppBar'
import { AuthContext } from "../context/AuthContext";
import { useAuthLogic } from '../hooks/useAuthLogic';
const AuthSystem = () => {
  const context = useContext(AuthContext);
  const localAuth = useAuthLogic();

  const auth = context || localAuth;

  return (
    <div>
      <AppBar username={auth.userName} handleLogout={auth.handleLogout} />
      {auth.userName ? (
        <Home />
      ) : (
        <Login handleLogin={auth.handleLogin} />
      )}
    </div>
  )
}

export default AuthSystem