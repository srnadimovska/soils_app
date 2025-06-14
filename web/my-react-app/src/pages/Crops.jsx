import  axios   from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './Crops.module.css';

function Crops() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCrops = async() => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:9000/api/v1/crops',{headers : {
                    Authorization: `Bearer ${token}`
                }} );
                setData(res.data);

            } catch(err){
                console.log(err.message);
                setError('Greska pri vcituvanje na podatoci');
            }
        };

        fetchCrops();
    },[]);
    return (
        <div className={styles.container}>
            <h2>Сите земјоделски култури</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className={styles.cropsList}>
                {data.map((crop,index) => (
                    <li key={index} className={styles.cropsCard}>
                        <h1>{crop.name}</h1> 
                        <p>{crop.location}</p> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Crops