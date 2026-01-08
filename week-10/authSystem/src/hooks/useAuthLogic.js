import { useState } from 'react';

export const useAuthLogic = () => {
  const [userName, setUsername] = useState("");
  const handleLogin = name => setUsername(name);
  const handleLogout = () => setUsername("");
  return { userName, handleLogin, handleLogout };
}