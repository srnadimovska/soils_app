import  axios   from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function Fertilizers() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFertilizers = async() => {
            try {
                const res = await axios.get('http://localhost:10000/api/v1/fertilizers');
                setData(res.data);

            } catch(err){
                console.log(err.message);
                setError('Greska pri vcituvanje na podatoci');
            }
        };

        fetchFertilizers();
    },[]);

    return (
        <div>
            <h2>Site gjubriva</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {data.map((fert,index) => (
                    <li key={index}>
                        {fert.name} - {fert.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Fertilizers