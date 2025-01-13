import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json()
    })
    .then((data) => {
      setPosts(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <header className='App-header'>
        <h1>Posts Viewer</h1>
        {loading && <p>Loading posts...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <ul className='posts-list'>
            {posts.map((post) => (
              <li key={post.id} className='post-item'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
