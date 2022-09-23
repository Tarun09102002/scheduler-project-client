import './App.css';
import { Routes, Route } from 'react-router-dom'
import { StartUpPage, Login, Register, Home, AddTask, ViewTask, Calendar } from './components/index';
import { useState } from 'react'


function App() {
  // const [loggedIn, setLoggedIn] = useState(false)
  // setLoggedIn(localStorage.getItem('loggedIn'))
  return (
    <Routes>
      {/* <Route path="/" element={localStorage.getItem('loggedIn') ? <Home /> : <StartUpPage />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/addevent" element={<AddTask />} />
      <Route path='/task/:id' element={<ViewTask />} />
      <Route path='/calendar' element={<Calendar />} />
      <Route path='/:date' element={<Home />} />
    </Routes>
  );
}

export default App;
