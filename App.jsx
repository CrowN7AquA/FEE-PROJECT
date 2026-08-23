import { useState } from 'react';
import './App.css';

// Blog posts with a news/simple blog style
const posts = [
  {
    id: 1,
    title: "My First Day at School",
    author: "Alex Johnson",
    date: "March 15, 2026",
    content: "Today was my first day at school. I was nervous but excited. I met my teacher and made some new friends. The classroom was big and colorful.",
    category: "Personal",
    readTime: "3 min"
  },
  {
    id: 2,
    title: "How to Bake Cookies",
    author: "Sarah Miller",
    date: "March 14, 2026",
    content: "Baking cookies is easy and fun. You need flour, sugar, eggs, and chocolate chips. Mix everything together and bake for 10 minutes. Yummy!",
    category: "Food",
    readTime: "4 min"
  },
  {
    id: 3,
    title: "My Favorite Movie",
    author: "Mike Chen",
    date: "March 13, 2026",
    content: "I watched a really cool movie last weekend. It had amazing special effects and a great story. I would watch it again with my friends.",
    category: "Entertainment",
    readTime: "2 min"
  }
];

function App() {
  // Simple state for showing a welcome message
  const [message] = useState("Welcome to my blog!");

  return (
    <div className="app">
      <header className="header">
        <h1>📰 The Daily Blur</h1>
        <p className="subtitle">{message}</p>
      </header>

      <div className="blog-list">
        {posts.map((post) => (
          <div key={post.id} className="blog-post">
            <div className="post-meta">
              <span className="category">{post.category}</span>
              <span className="date">{post.date}</span>
              <span className="read-time">{post.readTime}</span>
            </div>
            <h2>{post.title}</h2>
            <p className="content">{post.content}</p>
            <div className="post-footer">
              <span className="author">✍️ {post.author}</span>
              <a href="#" className="read-more" onClick={(e) => e.preventDefault()}>
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>🌱 simple blog · made with React · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;