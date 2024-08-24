import React, { useState, useEffect } from 'react';
import './styles.css';
import { useSelector, useDispatch, } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { instanceClients,instanceUsers } from './axios';





const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [deconnection, setDeconnection] = useState(false);

    const [users, setUsers] = useState([]);
    createdAt: new Date().toISOString()

    const cltId = useSelector((state) => state.clients.clientId);
    const cltName = useSelector((state) => state.clients.name);

    const date = new Date();

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
                currentDate: formattedDate // Envoyer la date formatée avec le message
            });
            setInput('');
        }
    };
    

   
    useEffect(() => {
        if (!socket) return;
    
        // Set the authenticated user's email
        setUserEmail(socket.auth.mail);
        setUserName(socket.auth.name);
    
        // Handle incoming messages
        socket.on('message', (message) => {
            console.log('Message received:', message); // Check received message
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
            setDeconnection(true);

            socket.disconnect();
        };
    }, [socket, cltId]);
    
    const chatRoute = `/${(cltId)}`;
    console.log('A user connected:', deconnection);


        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await instanceUsers.get(chatRoute);
                     setUsers(response.data);
                } catch (error) {
                   console.error('Error fetching users:', error);
                }
            };
    
            fetchUsers();
        }, []);

        function Deconnection(nom){
            if(deconnection)
                <h2>{nom} est deconecté</h2>
    
        }
    return (


        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === userEmail ? 'my-message' : 'other-message'}`}>
            <div style={{color:'red'}}>date:{msg.currentDate}</div> {/* Affichez la date reçue avec le message */}
            <p style={{color:'blue'}}>name:{msg.name}</p>
                        <p>{msg.text}</p>
                        {deconnection && <Deconnection nom={msg.nam} />}

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
