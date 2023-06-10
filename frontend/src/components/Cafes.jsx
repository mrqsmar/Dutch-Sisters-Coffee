import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DropdownComponent from './DropdownMenuField'

const Cafes = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchAllCafes = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_DB_URL + "cafes");
        setCafes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCafes();
  }, []);


  // Deleting 
  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_DB_URL + `cafes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // Adding
  const [streetAddress, setStreetAddress] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_DB_URL + "cafes/", {
        street_address: streetAddress,
        street_name: streetName,
        city: city,
        state: state,
        country: country,
        zip_code: zipCode
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

    // update
    const [updateCafeId, setUpdateCafeId] = useState('');
    const [updateStreetAddress, setUpdateStreetAddress] = useState('');
    const [updateStreetName, setUpdateStreetName] = useState('');
    const [updateCity, setUpdateCity] = useState('');
    const [updateState, setUpdateState] = useState('');
    const [updateCountry, setUpdateCountry] = useState('');
    const [updateZipCode, setUpdateZipCode] = useState('');

    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        await axios.put(process.env.REACT_APP_DB_URL + "cafes/", {
        cafe_id: updateCafeId,
        street_address: updateStreetAddress,
        street_name: updateStreetName,
        city: updateCity,
        state: updateState,
        country: updateCountry,
        zip_code: updateZipCode
      });
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="entity-page">
      <h1>Cafes</h1>
      <h2>Browse, Add, Update or Delete Cafes</h2>
      <div className="table-container">
        <table border="1" cellpadding="5">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Street Address</th>
            <th>Street Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Zip Code</th>
          </tr>
          {cafes.map((cafe) => (
              <tr key={cafe.cafe_id}>
                <button className="delete" onClick={() => handleDelete(cafe.cafe_id)}>Delete</button>
                <td>{cafe.cafe_id}</td>
                <td>{cafe.street_address}</td>
                <td>{cafe.street_name}</td>
                <td>{cafe.city}</td>
                <td>{cafe.state}</td>
                <td>{cafe.country}</td>
                <td>{cafe.zip_code}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a Cafe form */}
      <div className="form-container">
        <form id="addCafe">
          <legend><strong>Add Cafe</strong></legend>
          <fieldset className="fields">
            <label className="form-label"> Street Address </label>
            <input type="text" name="streetAddress" className="form-input" onChange={(e) => setStreetAddress(e.target.value)} />
            
            <label className="form-label"> Street Name </label>
            <input type="text" name="streetName" className="form-input" onChange={(e) => setStreetName(e.target.value)} />
            
            <label className="form-label"> City </label>
            <input type="text" name="city" className="form-input" onChange={(e) => setCity(e.target.value)} />
            
            <label className="form-label"> State </label>
            <input type="text" name="state" className="form-input" onChange={(e) => setState(e.target.value)} />
            
            <label className="form-label"> Country </label>
            <input type="text" name="country" className="form-input" onChange={(e) => setCountry(e.target.value)} />
            
            <label className="form-label"> Zip Code </label>
            <input type="number" name="zipCode" className="form-input" onChange={(e) => setZipCode(e.target.value)} />
          </fieldset>
          <input className="form-btn" type="submit" id="addCafe" value="Add Cafe" onClick={handleAdd} />
        </form>
      </div>
      
      <br></br>
        
      {/* Editing a Cafe form */}
      <div className="form-container">
        <form id="UpdateCafe">
          <legend><strong>Update Cafe</strong></legend>
          <fieldset class="fields">
            <input type="hidden"></input>
            <label className="form-label"> Cafe ID: </label> <DropdownComponent ids={cafes.map(({ cafe_id }) => cafe_id)} onSelect={setUpdateCafeId}  />
            <label className="form-label"> Street Address </label> <input type="text" name="streetAddress" className="form-input" onChange={(e) => setUpdateStreetAddress(e.target.value)}></input>
            <label className="form-label"> Street Name </label> <input type="text" name="streetName" className="form-input" onChange={(e) => setUpdateStreetName(e.target.value)}></input>
            <label className="form-label"> City </label> <input type="text" name="city" className="form-input" onChange={(e) => setUpdateCity(e.target.value)}></input>
            <label className="form-label"> State </label> <input type="text" name="state" className="form-input" onChange={(e) => setUpdateState(e.target.value)}></input>
            <label className="form-label"> Country </label> <input type="text" name="country" className="form-input" onChange={(e) => setUpdateCountry(e.target.value)}></input>
            <label className="form-label"> Zip Code </label> <input type="number" name="zipCode" className="form-input" onChange={(e) => setUpdateZipCode(e.target.value)}></input>
          </fieldset>
          <input class="form-btn" type="submit" id="UpdateSaveCafe" value="Save Update Cafe" onClick={(handleUpdate)}></input>
        </form> 
      </div>
      <br></br>

    </div>
  );
};

export default Cafes;
