import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/cafes/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdd = async (id) => {
  //   try {
  //     await axios.put(`http://flip2.engr.oregonstate.edu:8299/cafes/`);
  //     window.location.reload()
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <h1>Cafes</h1>
      <div className="cafes">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newCafe()">New</a></th>
            <th></th>
            <th>id</th>
            <th>street_address</th>
            <th>street_name</th>
            <th>city</th>
            <th>state</th>
            <th>country</th>
            <th>zip_code</th>
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
            <label> street address </label> <input type="text" name="streetAddress"></input>
            <label> street name </label> <input type="text" name="streetName"></input>
            <label> city </label> <input type="text" name="city"></input>
            <label> state </label> <input type="text" name="state"></input>
            <label> country </label> <input type="text" name="country"></input>
            <label> zip code </label> <input type="text" name="zipCode"></input>
          </fieldset>
          <input class="btn" type="submit" id="addCafe" value="Add Cafe"></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a Cafe form */}
      <form method="PUT" id="UpdateCafe">
				<legend><strong>Update Cafe</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> 1
					<label> street address </label> <input type="text" name="streetAddress" value="123"></input>
					<label> street name </label> <input type="text" name="streetName" value="Santa Claus Lane"></input>
					<label> city </label> <input type="text" name="city" value="North Pole"></input>
					<label> state </label> <input type="text" name="state" value="AK"></input>
					<label> country </label> <input type="text" name="country" value="USA"></input>
					<label> zip code </label> <input type="text" name="zipCode" value="99999"></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveCafe" value="Save Update Cafe"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default Cafes;