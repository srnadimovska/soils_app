import { useState, useEffect } from "react";
import axios from "axios";

function Pocva() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPocva = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:10000/api/v1/soil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        // da pustime bearer token za doma
      } catch (err) {
        console.log(err.message);
        setError("Greska pri vcituvanje na server");
      }
    };

    fetchPocva();
  }, []);

  return (
    <div>
      <h2>Site pocvi</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {data.map((p, index) => (
          <li key={index}>
            <h1>{p.name}</h1>
            <p>{p.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pocva;
