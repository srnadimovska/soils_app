import React from 'react';
import { jwtDecode } from 'jwt-decode'

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
    return <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 'bold', color: 'lightblue' }}>Najaven gostin: {name}</h3>
        <h1>Dobredojdovte na prvata aplikacija za pocvi vo Makedonija</h1>
        <h2>Stanete del od zemojdelcite vo nasata drzava</h2>
        
        <p>Ovaa aplikacija ni ovozmozuva da pregleduvame informacii za zemjodelskite raboti
            i site potrebni informacii moze da gi najdete tuka
        </p>

        <p>
            Za doma: da go zbigatime menito so pocva, zemjodelski kulturi,gjubriva,mehanizacija
            i koga ke se najavi korosnikot da se napisa dobredojde ... na nasata stranica
            so import jwtDecode from jwt-decode
        </p>
    </div>
}

export default Homepage