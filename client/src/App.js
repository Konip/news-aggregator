import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './copmponents/Footer';
import Header from './copmponents/Header';
import Home from './copmponents/Home';
import News from './copmponents/News';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route  path={"/"} element={<Home />} />
          <Route  path={"/news/:translit"} element={<News />} >
            {/* <Route path={":translit"} /> */}
          </Route>
          <Route path={"*"} element={<Home />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
