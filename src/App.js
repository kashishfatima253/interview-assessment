// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './components/Register';
import Users from './components/Users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  // const client = new QueryClient()
  return (
    <div className="App">
      {/* <Login/> */}
      {/* <QueryClientProvider> */}
      <Router>
       <Routes>
        <Route path='/' element={<Login/>} /> {/*main page of the website */}
        <Route path='/register' element={<Register/>} /> 
        <Route path='/users' element={<Users/>} /> 
        </Routes> {/* equivalent to a tags. Every routes that we define comes in between the Routes tag */}
    </Router>
    {/* </QueryClientProvider> */}
    </div>
  );
}

export default App;
