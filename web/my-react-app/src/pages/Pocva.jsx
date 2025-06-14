import { useState, useEffect } from "react";
import axios from "axios";
import styles from './Pocva.module.css';

function Pocva() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [newSoil, setNewSoil] = useState({name:"",location:"",type:"",ph:""});

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  
    const fetchPocva = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:9000/api/v1/soil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        
      } catch (err) {
        console.log(err.message);
        setError("Greska pri vcituvanje na server");
      }
    };
    
  useEffect(() => {
    fetchPocva();
  }, []);

  const handleAddSoil = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:9000/api/v1/soil', newSoil,
        {
          headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type" : "application/json",
          },
        }
      );
      setNewSoil({ name:"",location:"",type:"",ph:""});
      fetchPocva();
    }catch(err) {
      console.log(err.message);
      setError('Failed to add new soil');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Сите почви</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className={styles.soilList}>
        {data.map((p, index) => (
          <li key={index} className={styles.soilCard}>
            <h1>{p.name}</h1>
            <p>{p.location}</p>
            <p> {p.type}</p>
            <p> {p.ph}</p>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <form onSubmit={handleAddSoil} className={styles.form}>
          <h3>Dodadi pocva:</h3>
          <input
            type="text"
            placeholder="Име"
            value={newSoil.name}
            onChange={(e) => setNewSoil({ ...newSoil, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Локација"
            value={newSoil.location}
            onChange={(e) => setNewSoil({ ...newSoil, location: e.target.value })}
            required
          />
          <select
            placeholder="Тип"
            value={newSoil.type}
            onChange={(e) => setNewSoil({ ...newSoil, type: e.target.value })}
            required
          >
            <option value=''>Izberi tip na pocva</option>
            <option value='aluvijalna'>Aluvijalna</option>
            <option value='humus'>Humus</option>
            <option value='deluvijalna'>Deluvijalna</option>
            <option value='pesok'>Pesok</option>
            <option value='crvenica'>Crvenica</option>
          </select>
          <input
            type="number"
            placeholder="pH"
            value={newSoil.ph}
            onChange={(e) => setNewSoil({ ...newSoil, ph: e.target.value })}
            required
          />
          <button type="submit">Додади</button>
        </form>
      )}
      
    </div>
  );
}

export default Pocva;
