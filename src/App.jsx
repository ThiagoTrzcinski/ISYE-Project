import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, setupCollections } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Article from './pages/Article/Article';
import Course from './pages/Course/Course';

const App = () => {
  const navigate = useNavigate();

  // Função para inicializar as coleções
  useEffect(() => {

    // Gerenciar autenticação
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Logged In");
        navigate('/');
      } else {
        console.log("Logged Out");
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/article/:id' element={<Article />} />
        <Route path='/course/:id' element={<Course/>}/>
      </Routes>
    </div>
  );
};

export default App;
