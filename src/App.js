import './App.css';
import Post from './copmponents/Post';
import posts from './posts.json';

function App() {
  return (
    <div className="App">

      {
        posts.map((p, index) => (
          <Post key={index} title={p.title} description={p.description}
            image={p.image} />
        ))
      }
    </div>
  );
}

export default App;
