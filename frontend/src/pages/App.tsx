import { useContext } from 'react';
import Manager from '../components/Manager';
import NavBar from '../components/Navbar';
import { AuthContext } from '../context/auth/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="font-outfit font-semibold">
      <NavBar loggedIn={user !== null} />
      <Manager />
    </div>
  );
}

export default App;
