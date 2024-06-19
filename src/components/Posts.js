import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/posts/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchPosts();
    }, [navigate]);

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8000/api/posts/', {
                description
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts([response.data, ...posts]);
            setDescription('');
        } catch (error) {
            console.error('Error creating post:', error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/posts/${postId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(posts.filter(post => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h2>Posts</h2>
            <button onClick={handleLogout}>Logout</button>
            <form onSubmit={handlePost}>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <p>{post.user.username}: {post.description}</p>
                        <small>{new Date(post.created_at).toLocaleString()}</small>
                        {post.can_delete && <button onClick={() => handleDelete(post.id)}>Delete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
