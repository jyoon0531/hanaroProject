// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { SessionProvider } from './contexts/session-context';
import Home from './components/Home';
import Albums from './components/Albums';
import AlbumDetail from './components/AlbumDetail';
import { AlbumCotextProvider } from './contexts/album-context';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className='contianer'>
        <SessionProvider>
          <Home />
          <AlbumCotextProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/albums' element={<Albums />} />
              <Route path='/photos' element={<AlbumDetail />} />
            </Routes>
          </AlbumCotextProvider>
        </SessionProvider>
      </div>
    </>
  );
}

export default App;
