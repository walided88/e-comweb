import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { instanceUsers } from '../axios';
import { useDispatch } from 'react-redux';
import { getClient,getName} from '../reducers/clientsReducer';
import io from 'socket.io-client';

const AuthForm = ({ setSocket }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState(null);
    const [fetchedName, setFetchedName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);


  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            let response;
            if (isSignUp) {
                response = await instanceUsers.post('/signup', { 
                    name,
                    email,
                    password,
                    age
                });
            } else {
                response = await instanceUsers.post('/login', {
                    email,
                    password
                });

                setUsers(response.data);
                // setFetchedName(users.user.name);
                // dispatch(getName(fetchedName));
            }
            // console.log('  users.name users.name users.name:',users.user.name); // Check received message
            console.log(' emailemailemail:',email); // Check received message

            // Save token in localStorage
            localStorage.setItem('token', response.data.token);

            // Initialize socket connection after login/signup
            const socket = io('https://e-comweb.onrender.com', {
              auth: {
                    token: response.data.token,
                    mail:email,
                },
                transports: ['websocket'],// Force l'utilisation de WebSocket
                timeout: 5000, // Délai d'attente de 5 secondes


            });
            
            setSocket(socket); // Pass the socket to parent component
            const chatRoute = `/${email}`;
            // console.log(email,"emailemailemailemailemailemail");
            setName('');
            setEmail('');
            setPassword('');
            setAge('');
            navigate('/chat');
            dispatch(getClient(email));

            navigate({chatRoute});

        } catch (error) {
            setError('Failed to process request: ' + (error.response?.data?.message || error.message));
        }
        // console.log(users.name, 'users.nameusers.name');







    };

    return (
        <Container>
            <FormWrapper>
                <Title>{isSignUp ? 'Sign Up' : 'Login'}</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <FormGroup>
                            <Label htmlFor="name">Name:</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={isSignUp}
                                placeholder="Enter your name"
                            />
                        </FormGroup>
                    )}
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </FormGroup>
                    {isSignUp && (
                        <FormGroup>
                            <Label htmlFor="age">Age (optional):</Label>
                            <Input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Enter your age"
                            />
                        </FormGroup>
                    )}
                    <Button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</Button>
                </form>
                <ToggleText>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'Login here' : 'Sign up here'}
                    </ToggleButton>
                </ToggleText>
            </FormWrapper>
        </Container>
    );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    border-color: #6a11cb;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6a11cb;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #2575fc;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #333;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #6a11cb;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;
export default AuthForm;
