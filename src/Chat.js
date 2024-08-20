import React, { useState, useEffect } from 'react';
import './styles.css';
import { useSelector } from 'react-redux';

const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const cltId = useSelector((state) => state.clients.clientId);
    useEffect(() => {
        if (!socket) return;
        console.log(socket.auth,'socketsocketsocketsocketsocket');

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, cltId]);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('message', { text: input, sender: 'me', id: cltId });
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
