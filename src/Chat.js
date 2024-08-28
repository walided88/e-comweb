import React, { useState, useEffect } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { instanceUsers } from './axios';
import { addMessage } from './reducers/clientsReducer';

const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [input, setInput] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const cltId = useSelector((state) => state.clients.clientId);

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            try {
                const response = await instanceUsers.get('/');
                setUtilisateurs(response.data);
                console.log('Response:', response.data);
            } catch (error) {
                setError('Failed to fetch utilisateurs');
            }
        };

        fetchUtilisateurs();
    }, []);

    useEffect(() => {
        if (!socket) return;

        setUserEmail(socket.auth.mail);
        setUserName(socket.auth.name);

        socket.on('message', (message) => {
            console.log('Message received:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
            dispatch(addMessage(message));
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, cltId, dispatch]);

    const sendMessage = () => {
        if (input.trim()) {
            const date = new Date();
            const formattedDate = date.toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(',', '');

            socket.emit('message', {
                text: input,
                sender: cltId,
                name: userName,
                currentDate: formattedDate
            });
            setInput('');
        }
    };

    return (
        <div className="chat-wrapper">
            <div className="users-list">
                <h3>Utilisateurs</h3>
                <ul>
                    {utilisateurs.map((user) => (
                        <li key={user._id}>{user.name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Chat</h2>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender === userEmail ? 'my-message' : 'other-message'}`}>
                            <div style={{color:'red'}}>date: {msg.currentDate}</div>
                            <p style={{color:'blue'}}>name: {msg.name}</p>
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
        </div>
    );
};

export default Chat;
