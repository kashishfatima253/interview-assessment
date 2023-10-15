// import logo from './logo.svg';
import { createContext, useState } from 'react';
import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './components/Register';
import Users from './components/Users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './UserContext.js';


function App() {
  return (
    <div className="App">
      <UserProvider>
      <Router>
       <Routes>
        <Route path='/' element={<Login/>} /> 
        <Route path='/register' element={<Register/>} /> 
        <Route path='/users' element={<Users/>} /> 
        </Routes> 
    </Router>
    </UserProvider>
    </div>
  );
}

export default App;
