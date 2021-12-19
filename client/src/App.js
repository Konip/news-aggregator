import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import Post from './copmponents/Post';
import result from './result.json';

function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  const [data, setData] = useState(result)
  const [loading, setLoading] = useState(false)
  // useEffect(() => {
  //   axios.getNews("https://600c28d538fd25001702cf0c.mockapi.io/posts")
  //     .then(({data}) => {
  //       setData(data)
  //     })
  // }, [])

  function getNews(str) {
    setLoading(true)
    axios.get(process.env.REACT_APP_SERVER_URL + str)
      .then(({ data }) => setData(data))
      .finally(setLoading(false))
  }

  return (
    <div className="App">
      <div className="Layout-container">
        <div className='Layout-header'>
          {/* <button onClick={() => changeNews('riaNews')}>Ria</button> */}
          <Button variant="outlined" onClick={() => getNews('rt')}>Rt</Button>
          <Button variant="outlined" onClick={() => getNews('tass')}>Tass</Button>
        </div>
        <div className='Layout-content'>
          <div className="grid-root">
            <div className="grid-container">
              <div className="section">
              
                 {data &&
                  data.map((b, index) => (
                    <Post key={index} title={b.title} description={b.text}
                      image={b.image} />
                  ))
                }
              
               
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
