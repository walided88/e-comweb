import React, { useState, useEffect,useCallback } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { instanceUsers,instanceMessages } from './axios';
import { addMessage,deleteMessage } from './reducers/clientsReducer';
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
    }, [fetchMessages, reduxMessages]); // Adding `fetchMessages` and `reduxMessages` to the dependency array

 
    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await instanceUsers.get(`/${cltId}`);
                setUserData(response.data);
            } catch (error) {
                setError('Failed to fetch utilisateurs');
            }
        };

        fetchDataUser();
    }, []);
 
    useEffect(() => {
        if (!socket) return;

        socket.on('connect', async () => {
            const response = await instanceMessages.get('/');

                setMessages(response.data);
        });
        setIsConnected(true);

        socket.on('message', (message) => {
            setIsLoading(true);

            dispatch(addMessage(message));
            socket.on('message', (message) => {
                setIsLoading(true);
                setTimeout(() => {
               
                    setIsLoading(false);
                }, 2000); // Ajuste ce délai selon tes besoins
            });
        });

        return async () => {
     
            dispatch(deleteMessage());
            socket.disconnect();
        };
    }, [socket, dispatch,messages]);

    useEffect(() => {
        const putMessages = async () => {
            if (reduxMessages.length > 0) {
                try {
                    const response = await instanceMessages.put("/", { reduxMessages });
                    console.log(response, "PUT response");
                    dispatch(deleteMessage()); // Delete messages from the Redux store after successful PUT
                } catch (error) {
                    console.error('Failed to update messages:', error);
                }
            }
        };
    
        putMessages();
    }, [reduxMessages, dispatch]); // Depend only on reduxMessages
    



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

             

              
            // }

            setMessages((prevMessages) => [...prevMessages, message]);
            dispatch(addMessage(message));
            socket.emit('message', message);
            setIsLoading(false);

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
                    disabled={!selectedUser} 
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
                    {isLoading && <Loader />}
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
                    {isLoading && <Loader />}

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
            )}

            <div className="users-list">
                <h3>Hello {userData.name}</h3>
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




// {messages.map((obj) => 
//     (obj.messages ?? [])
//         .filter(msg => !msg.toUserId).map((msg, index) => (
//                 <div 
//                     key={index} 
//                     className={`message ${msg.sender === cltId ? 'my-message' : 'other-message'}`}
//                 >
//                     <div style={{color:'red'}}>Date: {msg.currentDate}</div>
//                     <p>Name: {msg.name === userData.name ? 'You' : msg.name}</p>
//                     <p>{msg.text}</p>
//                 </div>
//                  ))
// )}