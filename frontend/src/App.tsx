import Manager from './components/Manager';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className="font-outfit font-semibold">
      <NavBar loggedIn={false} />
      <Manager />
    </div>
  );
}

export default App;
