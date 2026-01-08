import React from 'react'

const AppBar = ({ username, handleLogout }) => {
  return (
    <div>
      <p>Auth system demo</p>
      <p>welcome <span>{username || "Anon"}</span>!</p>
      {username && <button onClick={handleLogout}>Logout</button>}
    </div>
  )
}

export default AppBar