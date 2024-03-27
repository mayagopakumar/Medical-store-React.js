import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate=useNavigate();
  function goSignUp(){
    navigate('register')
  }
  function goLogin(){
    navigate('login')
  }
  return (
    <div className="background">
        <div className="heading">
          <h1>Medical Store App</h1>
          <p><i>Our goal is to create an accessible app that helps users to order prescribed medications with just a few clicks!</i></p>
          <button className="btn btn-primary" onClick={goSignUp}>SignUp</button>
          <button className="btn btn-primary ml-3" onClick={goLogin}>Login</button>
        </div>
    </div>
  );
}

export default App;
