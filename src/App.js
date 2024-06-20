import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'
import Posts from './components/Posts';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <div className='divCenter'>
                <header className="App-header">
                    <h1>Bird!</h1>
                    <h3>Acontecendo agora...</h3>
                </header>
                <main className="container">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/posts" element={
                            token ? <Posts /> : <Navigate to="/login" />
                        } />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
