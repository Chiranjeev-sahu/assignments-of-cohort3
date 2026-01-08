import { useState } from 'react';
import AuthSystem from './components/AuthSystem';
import { AuthProvider } from './context/AuthContext';
import './Auth.css';

function App() {
  const [useContextApi, setContextApi] = useState(false);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={useContextApi}
          onChange={(e) => setContextApi(e.target.checked)}
        />
        Use Context API: {useContextApi ? 'On' : 'Off'}
      </label>
      {useContextApi ? (
        <AuthProvider>
          <AuthSystem />
        </AuthProvider>
      ) : (
        <AuthSystem />
      )
      }
    </div>
  )
}

export default App;
