import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import {jwtDecode} from 'jwt-decode';



function Login() {
    const[email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const[error, setError] = useState('');
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     try{
    //         const res = await fetch('http://localhost:9000/api/v1/login',{
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({email, password}),

    //         });
    //         const data = await res.json();
    //         if(res.ok && data.token) {
    //             localStorage.setItem('token', data.token);
    //             navigate('/');
    //         } else {
    //             setError(res.data.error || 'Greska pri najavuvanje')
    //         }
    //     } catch(err){
    //         setError('Serverska greska')
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {

            const res = await axios.post('http://localhost:9000/api/v1/login',{email,password}, {headers: {'Content-Type' : 'application/json'}});
              if(res.data.token) {
                localStorage.setItem('token', res.data.token);

                const decoded = jwtDecode(res.data.token);
                if(decoded.role === 'admin') {
                    localStorage.setItem('isAdmin', 'true');
                } else {
                    localStorage.setItem('isAdmin','false');
                }

                navigate('/')
              } else {
                setError( res.data.error || 'Greska pri najavuvanje');
              }
        } catch(err){
            console.log(err);
            setError('Serverska greska')
        }

    };

    
    return (
    <div style={{maxWidth: 350, margin: '2rem auto'}}>
        <h2>Najava</h2>
        <form onSubmit={handleSubmit}>
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
            

            <button type='submit' style={{width: '100%'}}>Login </button>

        </form>

        </div>
    
    )
}

export default Login;