import { useState, useEffect } from "react";
import axios from "axios";

function Pocva() {
    const [data,setData] = useState([]);
    const[error, setError] = useState('');

    useEffect(() => {
        const fetchPocva = async() => {
            try {

                const res = await axios.get('http://localhost:10000/api/v1/soil');
                setData(res.data)
                // da pustime bearer token za doma

            } catch (err) {
                console.log(err.message);
                setError('Greska pri vcituvanje na server')
            }
        };

        fetchPocva();
    },[]);

    return (
        <div>
            <h2>Site pocvi</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {data.map((p,index) => (
                    <li key={index}>
                        {p.name} -
                        {p.location}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pocva;