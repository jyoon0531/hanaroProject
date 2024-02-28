// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { SessionProvider } from './contexts/session-contexts';
import Home from './components/Home';
import Albums from './components/Albums';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <SessionProvider>
        <Home />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/albums' element={<Albums />} />
        </Routes>
      </SessionProvider>
    </>
  );
}

export default App;
