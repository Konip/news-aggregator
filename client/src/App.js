import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './copmponents/Footer';
import Header from './copmponents/Header';
import Home from './copmponents/Home';
import News from './copmponents/News';
import { useInterval } from './hooks/useInterval';
import { getAllPostThunk } from './store/posts-reducer';

function App() {

  const dispatch = useDispatch()

  function getAllNews() {
    dispatch(getAllPostThunk())
  }

  React.useEffect(() => {
    getAllNews()
  }, [])

  let min = 60000

  useInterval(() => {
    getAllNews()
  }, min * 5);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/news/:translit"} element={<News />} />
        <Route path={"*"} element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
