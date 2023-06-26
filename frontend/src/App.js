import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import  PatientDetails  from './components/PatientDetails.js';
import Login from './components/Login';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
function App() {
  return (
    <>
      
      <BrowserRouter>
      <div className='pages'>
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="/details" element={<PatientDetails />}/>
            
          </Routes>
      </div>
      </BrowserRouter>
 
    </>
   
  );
}

export default App;
