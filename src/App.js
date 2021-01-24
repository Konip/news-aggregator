import './App.css';
import Post from './copmponents/Post';
import { useEffect, useState } from 'react';
import axios from "axios"


function App() {

  const [data,setData] = useState()

  useEffect(() => {
    axios.get("https://600c28d538fd25001702cf0c.mockapi.io/posts")
      .then(({data}) => {
        setData(data)
      })
  }, [])

  return (
    <div className="App">

      { data &&  
        data.map((p, index) => (
          <Post key={index} title={p.title} description={p.description}
            image={p.image} />
        ))
      }
    </div>
  );
}

export default App;
