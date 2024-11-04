// src/PostForm.js
import React, { useState } from 'react';

function PostForm() {
    const [formData, setFormData] = useState({
        name: '',
        value: '',
        email: '',
        age: '',

        password: ''

    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name,email,password,value,age } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            [email]: value,
            [age]: value,

            [password]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            setResponseMessage('Data submitted successfully!');
            setFormData({ name: '', value: '' });  // Reset the form after submission
            setFormData({ email: '', value: '' });  // Reset the form after submission
            setFormData({ password: '', value: '' });  // Reset the form after submission
            setFormData({ age: '', value: '' });  // Reset the form after submission

        })
        .catch(err => {
            setResponseMessage('Error submitting data!');
            console.error('Error:', err);
        });
    };

    return (
        <div>
            <h1>Submit Data to MongoDB</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='bg-primary'>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label className='bg-primary'>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
              
                        <label className='bg-primary'>Passeword:</label>

                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                          <label className='bg-primary'>age:</label>

                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
               
                </div>
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p className='bg-primary'>{responseMessage}</p>}
        </div>
    );
}

export default PostForm;
