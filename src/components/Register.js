import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/', {
                username,
                password1,
                password2
            });

            console.log('User registered successfully:', response.data);
            navigate('/login'); // Redireciona para a página de login após registro bem-sucedido
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
                <br />
                <label>Confirm Password:</label>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
