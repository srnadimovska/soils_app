import  axios   from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function Crops() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCrops = async() => {
            try {
                const res = await axios.get('http://localhost:9000/api/v1/crops');
                setData(res.data);

            } catch(err){
                console.log(err.message);
                setError('Greska pri vcituvanje na podatoci');
            }
        };

        fetchCrops();
    },[]);
    return (
        <div>
            <h2>Site zemjodelski kulturi</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {data.map((crop,index) => (
                    <li key={index}>
                        {crop.name} - {crop.location}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Crops