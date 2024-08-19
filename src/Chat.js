// src/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './styles.css'; // Assure-toi d'avoir ce fichier pour le style
import { useSelector, useDispatch } from 'react-redux';

const socket = io('http://localhost:5000'); // Assure-toi que l'URL du serveur est correcte

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const cltId = useSelector((state) => state.clients.clientId);
    console.log("cltIdcltIdcltIdcltIdcltId:", cltId); // Vérifie le message envoyé

    useEffect(() => {
        socket.on('message', (message) => {
            console.log("New message received:", message); // Vérifie si le message est bien reçu
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            console.log("Sending message:", input); // Vérifie le message envoyé
            socket.emit('message', { text: input, sender: 'me',id:cltId }); // Assure-toi que le format du message est correct
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'me' ? 'my-message' : 'other-message'}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
                    placeholder="Type a message..." 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
