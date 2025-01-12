import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Posts Viewer</h1>
      </header>
    </div>
  );
}

export default App;
