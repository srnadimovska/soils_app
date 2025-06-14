import React from 'react';
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';
import styles from './Homepage.module.css';
import farmImage from '../assets/farm.png';

function getNameFromToken() {
    const token = localStorage.getItem('token');
    if(!token) return null;
    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.name || null;

    } catch {
        return null;
    }
}

function Homepage() {
    
    const name = getNameFromToken();
    const token = localStorage.getItem('token');

    

    return (
        <div>
            
    <div className={styles.container}>
        <div >
            <img src={farmImage} alt="farm=photo" className={styles.image}/>
        </div>
        <h3 >Здраво {name}!</h3>
        <h1>ДОБРЕДОЈДОВТЕ!</h1>
        <h2>Станете дел од земјоделците во Нашата земја!</h2>
        
        <p >Оваа апликација Ни овозможува да прегледуваме информации за земјоделски култури и
            сите потребни информации за нивно одгледување.
            Доколку имате дополнителни прашања, на располагање ви стои 
            Нашиот АИ-ЧАТ кој можете да го отворите на следниот линк:
            <Link to="/pocva-chat" className={styles.link}>
            Отвори ЧАТ
            </Link>

        </p>
    </div>
    </div>
)}

export default Homepage