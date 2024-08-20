import React, { createContext, useState } from 'react';
import AuthForm from './AutForm';
import Chat from '../Chat';
export const SocketContext = createContext(null);

const ParentComponent = () => {
    
    const [socket, setSocket] = useState(null);

    return (
        <div>
       <SocketContext.Provider value={socket}>
            <AuthForm setSocket={setSocket} />
            {socket && <Chat socket={socket} />}
        </SocketContext.Provider>
        </div>
    );
};

export default ParentComponent;
