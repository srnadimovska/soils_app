import  axios   from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Fertilizers.module.css';

function Fertilizers() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFertilizers = async() => {
            try {

                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:9000/api/v1/fertilizers',{headers : {
                    Authorization: `Bearer ${token}`
                }});
                setData(res.data);

            } catch(err){
                console.log(err.message);
                setError('Greska pri vcituvanje na podatoci');
            }
        };

        fetchFertilizers();
    },[]);

    return (
        <div className={styles.container}>
            <h2>Сите ѓубрива</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className={styles.fertList}>
                {data.map((fert,index) => (
                    <li key={index} className={styles.fertCard}>
                        <h1>{fert.name}</h1> 
                        <p>{fert.quantity}</p> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Fertilizers