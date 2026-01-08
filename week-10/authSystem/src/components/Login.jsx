import React, { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(name)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <input type="password" placeholder='ex:abc@1904' />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login