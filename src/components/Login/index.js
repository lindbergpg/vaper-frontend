import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import stylesLogin from './Login.module.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://bird-api-265ef50da0d8.herokuapp.com/api/token/', {
                username,
                password
            });

            localStorage.setItem('token', response.data.access);
            navigate('/posts'); // Redireciona para a página de posts
        } catch (error) {
            console.error('Error logging in:', error);
            alert("Login com erros, favor verifique o usuário ou senha.")
        }
    };

    return (
        <div className={stylesLogin.loginContainer}>
            <h2>Conecte-se</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className={stylesLogin.buttonLogin}>Entrar</button>
            </form>
            <p className={stylesLogin.pLogin}>Ainda não possui login?</p>
            <a href='/register'>Criar conta</a>
        </div>
    );
};

export default Login;
