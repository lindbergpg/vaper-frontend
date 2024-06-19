import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Feed de Postagens</h1>
                </header>
                <main>
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
