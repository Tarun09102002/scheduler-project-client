import './App.css';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { StartUpPage, Login, EditTask, Register, Home, AddTask, ViewTask, Calendar, SpecificDate, AddMeet, MeetInvites } from './components/index';
import { useState, useEffect } from 'react'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  // setLoggedIn(localStorage.getItem('loggedIn'))
  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('userid') && true)
  }, [loggedIn])
  return (
    <Routes>
      {/* <Route path="/" element={localStorage.getItem('loggedIn') ? <Home /> : <StartUpPage />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={sessionStorage.getItem('userid') && true ? < Home /> : <StartUpPage />} />
      <Route element={ProtectedRoutes(sessionStorage.getItem('userid') && true)}>
        <Route path="/addevent" element={<AddTask />} />
        <Route path='/task/:id' element={<ViewTask />} />
        <Route path='/calendar' element={<Calendar />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/:date' element={<SpecificDate />} />
        <Route path='/edit/:id' element={<EditTask />} />
        <Route path='/addmeet' element={<AddMeet />} />
        <Route path='/invites' element={<MeetInvites />} />
      </Route>
    </Routes>
  );
}

const ProtectedRoutes = (auth) => {
  return (
    auth ? <Outlet /> : <Navigate to="/" />
  )
}

export default App;
