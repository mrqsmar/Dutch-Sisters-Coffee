import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const Franchisees = () => {
  const [franchisees, setFranchisees] = useState([]);

  useEffect(() => {
    const fetchAllFranchisees = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/franchisees");
        setFranchisees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllFranchisees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/franchisees/${id}`);
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
      <h1>Franchisees</h1>
      <div className="franchisees">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newFranchisee()">New</a></th>
            <th></th>
            <th>id</th>
            <th>first_name</th>
            <th>last_name</th>
          </tr>


          {franchisees.map((franchisee) => (
              <tr key={franchisee.franchisee_id}>
                <td><a href="#" onClick="editFranchisee()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(franchisee.franchisee_id)}>Delete</button>
                <td>{franchisee.franchisee_id}</td>
                <td>{franchisee.first_name}</td>
                <td>{franchisee.last_name}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a Franchisee form */}
      <div>
	  	<form method="POST" id="addFranchisee">
			<legend><strong>Add Franchisee</strong></legend>
			<fieldset class="fields">
				<label> first name </label> <input type="text" name="firstName"></input>
				<label> last name </label> <input type="text" name="lastName"></input>
			</fieldset>
			<input class="btn" type="submit" id="addFranchisee" value="Add Franchisee"></input>
		</form>
      </div>
      
      <br></br>

      {/* Editing a Franchisee form */}
	  <form method="PUT" id="UpdateFranchisee">
				<legend><strong>Update Franchisee</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={franchisees.map(({ franchisee_id }) => franchisee_id)} />
					<label> first name </label> <input type="text" name="firstName" value="Bob"></input>
					<label> last name </label> <input type="text" name="lastName" value="Gumbo"></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveFranchisee" value="Save Update Franchisee"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default Franchisees;