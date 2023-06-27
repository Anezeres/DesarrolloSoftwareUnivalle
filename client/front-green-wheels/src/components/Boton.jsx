import React, {useState} from 'react';
import axios from 'axios';


export const Button = () => {

    const [data, setData] = useState(null);

  const handleGetAll = async () => {
    await axios.get('http://localhost:8000/get_employees_email')
      .then(response => {
        // Manejar la respuesta de la petición GET aquí
        setData(response.data);
        console.log(data)
      })
      .catch(error => {
        // Manejar el error de la petición GET aquí
        console.error(error);
      });
  };

  return (
    <div className="button-group">
      <button className="button" onClick={handleGetAll}>Todos</button>
    </div>
  );
};


