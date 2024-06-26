import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import stylesRegister from './Register.module.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://bird-api-265ef50da0d8.herokuapp.com/api/users/', {
                username,
                password1,
                password2
            });

            console.log('User registered successfully:', response.data);
            alert("Usuário criado com sucesso!")
            navigate('/login'); // Redireciona para a página de login após registro bem-sucedido
        } catch (error) {
            console.error('Error registering user:', error);
            alert("Erro ao criar o usuário, verifique novamente.")
        }
    };

    return (
        <div className={stylesRegister.registerContainer}>
            <h2>Criar sua conta</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Usuário' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='Senha' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                <input type="password" placeholder='Confirme a Senha' value={password2} onChange={(e) => setPassword2(e.target.value)} />
                <button type="submit" className={stylesRegister.buttonRegister}>Registrar</button>
                <a href='/login'>Ir para o Login</a>
            </form>
        </div>
    );
};

export default Register;
