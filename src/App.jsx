import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalState } from './context';
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import 'sweetalert2/src/sweetalert2.scss'

function App() {
  const state = useContext(GlobalState);
  let isLogined = state.userAPI.userData[0] === null ? false : true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLogined ? <Chat /> : <Navigate to='/login' />} />
        <Route path="/login" element={isLogined ? <Navigate to='/' />  : <Login />} />
        <Route path="*" element={isLogined ? <Navigate to='/' />  : <Navigate to='/login' /> } />
      </Routes>
    </Router>
  )
}

export default App
