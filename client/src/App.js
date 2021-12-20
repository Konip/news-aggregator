import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './copmponents/Home';
import News from './copmponents/News';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/news"} element={<News />} >
            <Route path={":translit"} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
