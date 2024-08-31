import React, { useState, useEffect } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { instanceUsers } from './axios';
import { addMessage } from './reducers/clientsReducer';

const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('public'); // 'public' or 'private'

    const dispatch = useDispatch();
    const cltId = useSelector((state) => state.clients.clientId);

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            try {
                const response = await instanceUsers.get('/');
                setUtilisateurs(response.data);
            } catch (error) {
                setError('Failed to fetch utilisateurs');
            }
        };

        fetchUtilisateurs();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            dispatch(addMessage(message));
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, dispatch]);

    const sendMessage = () => {
        if (input.trim()) {
            const date = new Date().toLocaleString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(',', '');

            const message = {
                text: input,
                sender: cltId,
                name: socket.auth.name,
                currentDate: date,
                toUserId: activeTab === 'private' && selectedUser ? selectedUser._id : null // Null for public chat
            };

            socket.emit('message', message);
            setInput('');
        }
    };

    const selectUser = async (userId) => {
        try {
            const response = await instanceUsers.get(`/${userId}`);
            setSelectedUser(response.data);
            setActiveTab('private'); // Switch to private chat when a user is selected
        } catch (error) {
            setError('Failed to fetch user');
        }
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-tabs">
                <button 
                    className={activeTab === 'public' ? 'active' : ''} 
                    onClick={() => setActiveTab('public')}
                >
                    Public Chat
                </button>
                <button 
                    className={activeTab === 'private' ? 'active' : ''} 
                    onClick={() => setActiveTab('private')}
                    disabled={!selectedUser} // Disable private chat if no user is selected
                >
                    Private Chat
                </button>
            </div>

            {activeTab === 'public' && (
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Public Chat</h2>
                    </div>
                    <div className="chat-messages">
                        {messages.filter(msg => !msg.toUserId).map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.sender === cltId ? 'my-message' : 'other-message'}`}
                            >
                                <div style={{color:'red'}}>Date: {msg.currentDate}</div>
                                <p style={{color:'blue'}}>Name: {msg.name}</p>
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
            )}

            {activeTab === 'private' && selectedUser && (
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Chat with {selectedUser.name}</h2>
                    </div>
                    <div className="chat-messages">
                        {messages.filter(msg => msg.toUserId === selectedUser._id).map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.sender === cltId ? 'my-message' : 'other-message'}`}
                            >
                                <div style={{color:'red'}}>Date: {msg.currentDate}</div>
                                <p style={{color:'blue'}}>Name: {msg.name}</p>
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
            )}

            <div className="users-list">
                <h3>Utilisateurs</h3>
                <ul>
                    {utilisateurs.map((user) => (
                        <li 
                            key={user._id} 
                            onClick={() => selectUser(user.email)}
                            className={selectedUser && selectedUser._id === user._id ? 'selected' : ''}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
