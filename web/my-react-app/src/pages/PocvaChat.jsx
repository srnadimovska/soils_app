import axios from 'axios';
import { jwtDecode} from 'jwt-decode';
import styles from './PocvaChat.module.css';
import { useState } from 'react';
import { set } from 'cohere-ai/core/schemas';

function getUserName(){
    const token = localStorage.getItem('token');
    if(!token) return null;
    try{
        const decoded = jwtDecode(token);
        return decoded.name || decoded.email || decoded.username || null;
    } catch{
        return null;
    }

}

function PocvaChat() {
    const [messages, setMessages] = useState([]);
    const[input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const userName = getUserName();

    const handleSend = async (e) => {
        e.preventDefault();

        if(!input.trim()) return

        setMessages((prev) => [...prev,{role:'user', content:input , timestamp: new Date().toLocaleString()}]);
        setLoading(true)
        try{
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:9000/api/v1/soil/chat',{
                prompt: input
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            );

            setMessages((prev) => [...prev,{role:'ai', content:res.data.answer , timestamp: new Date().toLocaleString() || 'Nema odgovor'}]);
        } catch{
           
                setMessages((prev) => [...prev,{role:'ai', content: 'Greska pri komunikacija'}]);
            
        }
        setInput('');
        setLoading(false);
    };

    return <div className={styles.container}>
        <h2>Прашај ме се што те интересира!</h2>
        {userName && (
            <div className={styles.header}>
                Гостин: <b>{userName}</b>
            </div>
        )}
        <div className={styles.chatWrapper}>
        <div className={styles.chatBox}>
            {messages.map((msg, idx) => (
                <div key={idx} className={msg.role === "user"? `${styles.message} ${styles.messageUser}` 
                : styles.message}>
                    <span className={msg.role === "user" ? `${styles.bubble} ${styles.bubbleUser}` :
                styles.bubble}>
                        {msg.content}
                        <p className={styles.timestamp}>{msg.timestamp}</p>
                    </span>
                </div>
            ))}
            {loading && <div className={styles.loading}>Се вчитува ...</div>}
        </div>

        <form onSubmit={handleSend} className={styles.form}> 
            <input className={styles.input} type='text' value={input} onChange={(e) => setInput(e.target.value)} 
            placeholder='Прашај ме...'
            disabled={loading}/>
            <button type='submit' disabled={loading || !input.trim()}>
                Испрати</button>

        </form>
        </div>

    </div>

}

export default PocvaChat;

// '[{role: 'user', content:'Kazi mi za pocvite vo Makedonija'},{role:'ai',content:'Pocvite vo Makedonija se mnogu plodni'}]'