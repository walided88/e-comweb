import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [inRoom, setInRoom] = useState(false);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.on('user-joined', ({ userName }) => {
            setMessages((prevMessages) => [...prevMessages, `${userName} has joined the room.`]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const joinRoom = () => {
        if (roomId && userName) {
            socket.emit('join-room', { roomId, userName });
            setInRoom(true);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('message', { roomId, message: `${userName}: ${message}` });
            setMessage('');
        }
    };

    return (
        <div>
            {!inRoom ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <button onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <div>
                    <h3>Room ID: {roomId}</h3>
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index}>{msg.name}</div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
