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
    const [uderName, setUserName] = useState('');

    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('public'); // 'public' or 'private'

    const dispatch = useDispatch();
    const cltId = useSelector((state) => state.clients.clientId);
console.log(messages,"messagesmessagesmessages");
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
                name: socket.auth.name || "You",
                currentDate: date,
                toUserId: activeTab === 'private' && selectedUser ? selectedUser._id : null // Null for public chat
            };

      if(activeTab=== 'private'){

          // Ajouter le message localement pour que le client puisse voir son propre message
          setMessages((prevMessages) => [...prevMessages, message]);
          dispatch(addMessage(message)); 
  
      }
      
          // Envoyer le message via socket
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
            {/* Section pour basculer entre le chat public et privé */}
            <div className="chat-tabs">
                {/* Bouton pour accéder au chat public */}
                <button 
                    className={activeTab === 'public' ? 'active' : ''} 
                    onClick={() => setActiveTab('public')}
                >
                    Public Chat
                </button>
    
                {/* Bouton pour accéder au chat privé, désactivé si aucun utilisateur n'est sélectionné */}
                <button 
                    className={activeTab === 'private' ? 'active' : ''} 
                    onClick={() => setActiveTab('private')}
                    disabled={!selectedUser} // Désactive le chat privé si aucun utilisateur n'est sélectionné
                >
                    Private Chat
                </button>
            </div>
    
            {/* Contenu du chat public */}
            {activeTab === 'public' && (
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Public Chat</h2> {/* Titre de la section de chat public */}
                    </div>
                    <div className="chat-messages">
                        {/* Filtrer et afficher les messages publics (sans destinataire spécifique) */}
                        {messages.filter(msg => !msg.toUserId).map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.sender === cltId ? 'my-message' : 'other-message'}`}
                            >
                                {/* Affichage de la date du message */}
                                <div style={{color:'red'}}>Date: {msg.currentDate}</div>
                                {/* Affichage du nom de l'utilisateur */}
                                <p style={{color:'blue'}}>Name: {msg.name}</p>
                                {/* Affichage du texte du message */}
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        {/* Zone de saisie du message et bouton d'envoi */}
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
    
            {/* Contenu du chat privé, visible seulement lorsqu'un utilisateur est sélectionné */}
            {activeTab === 'private' && selectedUser && (
                <div className="chat-container">
                    <div className="chat-header">
                        {/* Titre affichant le nom de l'utilisateur avec qui on discute */}
                        <h2>Chat with {selectedUser.name}</h2>
                    </div>
                    <div className="chat-messages">
                        {/* Filtrer et afficher les messages privés envoyés à l'utilisateur sélectionné */}
                        {messages.filter(msg => msg.toUserId === selectedUser._id).map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.sender === cltId ? 'my-message' : 'other-message'}`}
                            >
                                {/* Affichage de la date du message */}
                                <div style={{color:'red'}}>Date: {msg.currentDate}</div>
                                {/* Affichage du nom de l'utilisateur */}
                                <p style={{color:'blue'}}>Name: {msg.name}</p>
                                {/* Affichage du texte du message */}
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        {/* Zone de saisie du message et bouton d'envoi */}
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
    
            {/* Liste des utilisateurs disponibles pour discuter */}
            <div className="users-list">
                <h3>Salut {cltId}</h3> {/* Salutation personnalisée */}
                <h3>Utilisateurs</h3> {/* Titre de la liste des utilisateurs */}
                <ul>
                    {/* Affichage des utilisateurs disponibles pour discuter en privé */}
                    {utilisateurs.map((user) => (
                        <li 
                            key={user._id} 
                            onClick={() => selectUser(user.email)}
                            className={selectedUser && selectedUser._id === user._id ? 'selected' : ''}
                        >
                            {user.name} {/* Nom de l'utilisateur */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Chat;
