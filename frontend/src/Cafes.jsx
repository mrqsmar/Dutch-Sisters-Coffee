import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DropdownMenuField from './DropdownMenuField'

const Cafes = () => {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchAllCafes = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/cafes");
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
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/cafes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // These 6 are all inclusive of the add form
  const [streetAddress, setStreetAddress] = useState('');
  const [streetName, setStreetName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://flip2.engr.oregonstate.edu:8299/cafes/`, {
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

  // These six are inclusive of the update form
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
      await axios.put(`http://flip2.engr.oregonstate.edu:8299/cafes_franchisees/`, {
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
    <div>
      <h1>Cafes</h1>
      <h2>Browse, Add, Update or Delete Cafes</h2>
      <div className="cafes">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newCafe()">New</a></th>
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
                <td><a href="#" onClick="editCafe()">Edit</a></td>
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
      <div>
        <form method="POST" id="addCafe">
          <legend><strong>Add Cafe</strong></legend>
          <fieldset class="fields">
            <label> Street Address </label> <input type="text" name="streetAddress" onChange={(e) => setStreetAddress(e.target.value)}></input>
            <label> Street Name </label> <input type="text" name="streetName" onChange={(e) => setStreetName(e.target.value)}> </input>
            <label> City </label> <input type="text" name="city" onChange={(e) => setCity(e.target.value)}></input>
            <label> State </label> <input type="text" name="state" onChange={(e) => setState(e.target.value)}></input>
            <label> Country </label> <input type="text" name="country" onChange={(e) => setCountry(e.target.value)}></input>
            <label> Zip Code </label> <input type="text" name="zipCode" onChange={(e) => setZipCode(e.target.value)}></input>
          </fieldset>
          <input class="btn" type="submit" id="addCafe" value="Add Cafe" onClick={(handleAdd)}></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a Cafe form */}
      <form method="PUT" id="UpdateCafe">
				<legend><strong>Update Cafe</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> Cafe ID: </label> <DropdownMenuField ids={cafes.map(({ cafe_id }) => cafe_id)} onSelect={setUpdateCafeId}  />
					<label> Street Address </label> <input type="text" name="streetAddress" value="123" onChange={(e) => setUpdateStreetAddress(e.target.value)}></input>
					<label> Street Name </label> <input type="text" name="streetName" value="Santa Claus Lane" onChange={(e) => setUpdateStreetName(e.target.value)}></input>
					<label> City </label> <input type="text" name="city" value="North Pole" onChange={(e) => setUpdateCity(e.target.value)}></input>
					<label> State </label> <input type="text" name="state" value="AK" onChange={(e) => setUpdateState(e.target.value)}></input>
					<label> Country </label> <input type="text" name="country" value="USA" onChange={(e) => setUpdateCountry(e.target.value)}></input>
					<label> Zip Code </label> <input type="text" name="zipCode" value="99999" onChange={(e) => setUpdateZipCode(e.target.value)}></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveCafe" value="Save Update Cafe" onClick={(handleUpdate)}></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default Cafes;