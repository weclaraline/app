import './App.css';
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      
       <Login></Login>
       <Logout></Logout>
    </div>
  );
}

export default App;
