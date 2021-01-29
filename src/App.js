import './App.css';
import Post from './copmponents/Post';
import { useEffect, useState } from 'react';
import axios from "axios"
import bd from './server/jsresult.json'
import changeNews from './server/changeNews';


function App() {

  // const [data,setData] = useState()

  // useEffect(() => {
  //   axios.get("https://600c28d538fd25001702cf0c.mockapi.io/posts")
  //     .then(({data}) => {
  //       setData(data)
  //     })
  // }, [])

  return (
    <div className="App">
      <div>
        <button onClick={() => changeNews('riaNews')}>Ria</button>
        <button onClick={() => changeNews('rtNews')}>Rt</button>
        <button onClick={() => changeNews('tassNews')}>Tass</button>
      </div>
      { bd &&
        bd.map((b, index) => (
          <Post key={index} title={b.title} description={b.text}
            image={b.image} />
        ))
      }
    </div>
  );
}

export default App;
