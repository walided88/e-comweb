import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { instanceUsers } from '../axios';
import { useDispatch } from 'react-redux';
import { getClient } from '../reducers/clientsReducer';
import io from 'socket.io-client';
import Loader from './Loader';
 
const AuthForm = ({ setSocket }) => {
    // States pour contrôler l'interface et les informations de l'utilisateur
    const [isSignUp, setIsSignUp] = useState(false); // Indique si on est en mode inscription
    const [name, setName] = useState(''); // Stocke le nom de l'utilisateur
    const [isLoading, setIsLoading] = useState(false); // Indique si une requête est en cours
    const [email, setEmail] = useState(''); // Stocke l'email de l'utilisateur
    const [password, setPassword] = useState(''); // Stocke le mot de passe
    const [age, setAge] = useState(''); // Stocke l'âge (optionnel)
    const [error, setError] = useState(''); // Stocke les messages d'erreur
    const navigate = useNavigate(); // Pour rediriger l'utilisateur après connexion/inscription
    const dispatch = useDispatch(); // Utilisé pour déclencher des actions Redux

    // Fonction déclenchée lors de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page par défaut
        setError(''); // Réinitialise les erreurs
        setIsLoading(true); // Démarre le loader

        try {
            let response;
            if (isSignUp) {
                // Requête API pour s'inscrire
                response = await instanceUsers.post('/signup', { 
                    name,
                    email,
                    password,
                    age
                });
            } else {
                // Requête API pour se connecter
                response = await instanceUsers.post('/login', {
                    email,
                    password
                });
            }

            // Démarre une connexion socket avec un délai
            setTimeout(() => {
                const socket = io('e-comweb-back.onrender.com', {
                    auth: {
                        token: response.data.token, // Token JWT pour l'authentification socket
                        mail: email, // Email utilisé pour l'authentification socket
                    },
                    transports: ['websocket', 'polling'], // Modes de transport socket
                });
                setSocket(socket); // Initialise le socket dans le parent avec setSocket
            }, 1000); // Délai de 1000 ms

            dispatch(getClient(email)); // Envoie une action Redux pour obtenir les infos client

            // Réinitialise les champs du formulaire
            setName('');
            setEmail('');
            setPassword('');
            setAge('');
            setIsLoading(false); // Arrête le loader

            // Redirige vers la page de chat (ou autre destination souhaitée)
        } catch (error) {
            setIsLoading(false); // Arrête le loader en cas d'erreur
            // Définit un message d'erreur si la requête échoue
            setError('Failed to process request: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>{isSignUp ? 'Sign Up' : 'Login'}</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    {isLoading && <Loader />}
                    {isSignUp && (
                        <FormGroup>
                            <Label htmlFor="name">Name:</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
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
                    <Button type="submit" disabled={isLoading}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Button>
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
