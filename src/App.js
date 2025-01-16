import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    // const savedPosts = localStorage.getItem("userPosts");
    // if (savedPosts) {
    //   setPosts(JSON.parse(savedPosts));
    //   setLoading(false);
    // } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
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

  // useEffect(() => {
  //   localStorage.setItem("userPosts", JSON.stringify(posts));
  // }, [posts]);

  const handleAddPost = () => {
    if (newPost.title.trim() && newPost.body.trim()) {
      const newPostObject = {
        id: Date.now(),
        title: newPost.title,
        body: newPost.body,
      }
      setPosts([newPostObject, ...posts]);
      setNewPost({ title: '', body: '' });
    }
  };

  const handleDeletePost = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
  }

  const handleSaveEdit = () => {
    if (editingPost.title.trim() && editingPost.body.trim()) {
      setPosts(
        posts.map((post) =>
          post.id === editingPost.id ? { ...post, ...editingPost } : post
        )
      )
      setEditingPost(null);
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="App">
      <header className='App-header'>
        <h1>Posts Viewer</h1>
        <div className='new-post'>
          <input
            type="text"
            placeholder='Post title'
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className='new-post-input styled-input'
          />
          <textarea
            placeholder='Post body'
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            className='new-post-textarea styled-input'
          />
          <button onClick={handleAddPost} className='add-post-button'>
            Add Post
          </button>
        </div>
        <input
          type="text"
          placeholder='Search posts...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-input styled-input'
        />
        {loading && <p>Loading posts...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <ul className='posts-list'>
            {filteredPosts.map((post) => (
              <li key={post.id} className='post-item'>
                {editingPost && editingPost.id === post.id ? (
                  <div className='edit-post'>
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className='edit-input styled-input'
                    />
                    <textarea
                      value={editingPost.body}
                      onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                      classname='edit-textarea styled-input'
                    />
                    <button
                      onClick={handleSaveEdit}
                      className='save-edit-button'>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <button
                      onClick={() => handleEditPost(post)}
                      className='edit-post-button'  
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className='delete-post-button'
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
