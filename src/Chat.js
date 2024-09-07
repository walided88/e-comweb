import React, { useState, useEffect,useCallback,useRef  } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { instanceUsers,instanceMessages } from './axios';
import { addMessage,deleteMessage,addConnected } from './reducers/clientsReducer';
import Loader from "./components/Loader";
const Chat = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [input, setInput] = useState('');
    const [userData, setUserData] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [test, setTest] = useState(true);

    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('public'); // 'public' or 'private'

    const dispatch = useDispatch();
    const cltId = useSelector((state) => state.clients.clientId);
    const reduxMessages = useSelector((state) => state.clients.clientMessage);
    const listCo = useSelector((state) => state.clients.listConnected);
    const [userStatus, setUserStatus] = useState({}); // État pour suivre le statut des utilisateurs
    const isUpdatingRef = useRef(false); // Crée une référence pour le flag `isUpdating`

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

    
    const fetchMessages = useCallback(async () => {
        try {
            
            const response = await instanceMessages.get('/');
           
            setMessages(response.data);
        } catch (error) {
            setError('Failed to fetch messages');
        }

    }, []); // Add dependencies if needed

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages, messages]); // Adding `fetchMessages` and `reduxMessages` to the dependency array

 
    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await instanceUsers.get(`/${cltId}`);
                dispatch(addConnected(cltId));

                setUserData(response.data);
            } catch (error) {
                setError('Failed to fetch utilisateurs');
            }
        };

        fetchDataUser();
    }, [setUserData]);
 

    useEffect(() => {
        if (!socket) return;
       // Écouteur pour l'événement 'user-status'
       socket.on('user-status', ({ userId, status }) => {
        setUserStatus(prevStatus => ({
            ...prevStatus,
            [userId]: status
        }));
    });
        // Écouteur pour l'événement 'connect'
        socket.on('connect', async () => {
            try {
                const response = await instanceMessages.get('/');
                setMessages(response.data);
                setIsConnected(true);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        });
     // Écouteur pour l'événement 'initialUserStatus'
     socket.on('initialUserStatus', (statusMap) => {
        setUserStatus(statusMap);
    });
        // Écouteur pour l'événement 'message'
        socket.on('message', (message) => {
        });
    
        // Nettoyage
        return () => {
            socket.off('user-status');
            socket.off('initialUserStatus');

            socket.off('message'); // Nettoie l'écouteur d'événement 'message'
            socket.disconnect(); // Déconnecte le socket
            setIsConnected(false); // Met à jour l'état de connexion
        };
    }, [socket]);


    
    
        useEffect(() => {
            const putMessages = async () => {

                if (reduxMessages.length > 0 && !isUpdatingRef.current) {
                    isUpdatingRef.current = true; // Empêche les mises à jour répétées
                    setIsLoading(true);
    
                    try {

                        const response = await instanceMessages.put("/", { reduxMessages });
                        console.log(response, "PUT response");
                    } catch (error) {
                        console.error('Failed to update messages:', error);
                    } finally {
                        dispatch(deleteMessage()); // Supprime les messages du store Redux après succès

                        setIsLoading(false);
                        isUpdatingRef.current = false; // Réinitialise le flag après la mise à jour
                    }
                }
            };
    
            putMessages();
        }, [reduxMessages]); // Dépend uniquement de reduxMessages et dispatch
    


        let isSending = false; // Flag pour éviter les envois multiples

    const sendMessage = async () => {
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
                name: userData.name || "You",
                currentDate: date,
                toUserId: activeTab === 'private' && selectedUser ? selectedUser._id : null // Null for public chat
            };
      
            // if (activeTab === 'private') {
            //     const messageString = "votreMessage"; // ou une variable contenant le message
            try {
                dispatch(addMessage(message));
                await socket.emit('message', message);
                setInput('');
            } catch (error) {
                console.error('Failed to send message:', error);
            } finally {
                isSending = false; // Réinitialise le flag après l'envoi
                setIsLoading(false);
            }
        
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
                    disabled={!selectedUser} 
                >
                    Private Chat
                </button>
            </div>

            <div style={{marginTop:"20%"}}>

            {isLoading && <Loader />}
            </div>

            {activeTab === 'public' && (
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Public Chat</h2>
                      

                    </div>
                    <div className="chat-messages">
                    {messages.map((obj) => 
    (obj.messages ?? []).filter(msg => !msg.toUserId).map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message ${msg.sender === cltId ? 'other-message' : 'my-message'}`}
                            >
                                <div style={{color:'red'}}>Date: {msg.currentDate}</div>
                                <p> Name: {msg.name === userData.name ? 'You' : msg.name} </p>
                                <p>{msg.text}</p>
                            </div>
                     ))
                    )}  
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
                    <h2>{selectedUser.name &&  "Chat With " + selectedUser.name}</h2>
                    </div>
                    <div className="chat-messages">

                    {messages.map((obj) => 
    (obj.messages ?? []).filter(msg => 
                        (msg.toUserId === selectedUser._id && msg.sender === cltId) || 
                        (msg.toUserId === userData._id && msg.sender === selectedUser.email)
                    ).map((msg, index) => (                            <div 
                                key={index} 
                                className={`message ${msg.sender === cltId ? 'my-message' : 'other-message'}`}
                            >
                                <div style={{color:'red'}}>Date: {msg.currentDate}</div>
                                <p> Name: {msg.name === userData.name ? 'You' : msg.name} </p>
                                <p>{msg.text}</p>
                            </div>
                 ))
                )}                    </div>
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
            )}<div className="users-list">
            <h3>
                Hello {userData.name} - {userStatus[userData._id] === 'online' ? 'Online' : 'Offline'}
            </h3>
            <h3>Users</h3>
            <ul>
                {utilisateurs
                    .filter(user => user.email !== userData.email) // Filtrer pour exclure userData
                    .map((user) => (
                        <li 
                            key={user._id} 
                            onClick={() => selectUser(user.email)}
                            className={selectedUser && selectedUser._id === user._id ? 'selected' : ''}
                        >
                            <span className='sent-message'>
                                {user.name}  
                                <span
                                    style={{
                                        color: userStatus[user._id] === 'online' ? 'green' : 'red',
                                        marginLeft: '10px'
                                    }}
                                >
                                    {userStatus[user._id] === 'online' ? 'Online' : 'Offline'}
                                </span>
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div>
        

            {/* <div className=".chat-tabs" >
                    <button 
                    onClick={() => selectUser(userData.email)}
                    >
                    Reveived Messages
                    </button>
                </div> */}
        </div>
    );
};

export default Chat;
