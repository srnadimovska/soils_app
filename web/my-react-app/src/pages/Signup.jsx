import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function Signup() {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {

            const res = await axios.post('http://localhost:10000/api/v1/signup',{name,email,password}, {headers: {'Content-Type' : 'application/json'}});
             
            if(res.status === 201 || res.data.message === 'User created') {
                
                navigate('/login')
              } else {
                setError( res.data.error || 'Greska pri registracija');
              }
        } catch(err){
            console.log(err);
            setError('Serverska greska')
        }

    };

    
    return (
    <div style={{maxWidth: 350, margin: '2rem auto'}}>
        <h2>Registracija</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                 style={{width: '100%', marginBottom: 8}}/>

            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                 style={{width: '100%', marginBottom: 8}}/>

            </div>

            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                 style={{width: '100%', marginBbottom: 8}}/>

            </div>

            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            

            <button type='submit' style={{width: '100%'}}>Signup </button>

        </form>

        </div>
    
    )
};

export default Signup;