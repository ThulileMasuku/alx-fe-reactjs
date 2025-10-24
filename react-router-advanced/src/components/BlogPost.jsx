import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  // 📚 Dynamic Routing: Get the variable path segment 'postId'
  const { postId } = useParams();

  // Simple mock data for demonstration
  const posts = {
    '1': { title: 'First Steps with React', content: 'A guide to getting started.' },
    '2': { title: 'Advanced Hooks Tutorial', content: 'Deep dive into useReducer and useContext.' },
    '3': { title: 'Routing with React Router', content: 'Details on nested and protected routes.' },
  };

  const post = posts[postId];

  if (!post) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Post Not Found 🧐</h2>
        <p>The post with ID **{postId}** does not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Post: {post.title}</h2>
      <p>Post ID: **{postId}**</p>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;