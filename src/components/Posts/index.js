import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import stylesPost from './Posts.module.css'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://bird-api-265ef50da0d8.herokuapp.com/api/posts/', {
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
            const response = await axios.post('https://bird-api-265ef50da0d8.herokuapp.com/api/posts/', {
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
            await axios.delete(`https://bird-api-265ef50da0d8.herokuapp.com/api/posts/${postId}/`, {
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
        <div class={stylesPost.postsContainer}>
            <div className={stylesPost.welcomeContainer}>
                <p className={stylesPost.welcomeTitle}>Olá, seja bem vindo!</p>
                <button className={stylesPost.buttonLogout} onClick={handleLogout}>Logout</button>
            </div>
            <form onSubmit={handlePost} class={stylesPost.formPost}>
                <textarea
                    maxLength={360}
                    placeholder='O que está pensando?'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className={stylesPost.buttonPost} type="submit">Postar</button>
            </form>
            <h2>Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <p className={stylesPost.user}>{post.user.username}</p>
                        <p className={stylesPost.textPost}>{post.description}</p>
                        <small>{new Date(post.created_at).toLocaleString()}</small>
                        {post.can_delete && <button onClick={() => handleDelete(post.id)} className={stylesPost.buttonDelete}>Delete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
