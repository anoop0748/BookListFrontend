
import './App.css';

import { BrowserRouter, Route, Router,Routes } from 'react-router-dom';
import Register from './registerCom/register';
import Login from './loginComp/login';
import Home from './homeCom/home';



function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
