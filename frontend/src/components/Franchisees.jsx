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

  // Deleting
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/franchisees/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


  // Adding 2 to the add form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://flip2.engr.oregonstate.edu:8299/franchisees/`, {
        first_name: firstName,
        last_name: lastName
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // Updating these three to the update form
  const [updateFranchiseeId, setUpdateFranchiseeId] = useState('');
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://flip2.engr.oregonstate.edu:8299/franchisees/`, {
        franchisee_id: updateFranchiseeId,
        first_name: updateFirstName,
        last_name: updateLastName
      });
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  };

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
	  	<form id="addFranchisee">
			<legend><strong>Add Franchisee</strong></legend>
			<fieldset class="fields">
				<label> First Name </label> <input type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)}></input>
				<label> Last Name </label> <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}></input>
			</fieldset>
			<input class="btn" type="submit" id="addFranchisee" value="Add Franchisee" onClick={(handleAdd)}></input>
		</form>
      </div>
      
      <br></br>

      {/* Editing a Franchisee form */}
	  <form id="UpdateFranchisee">
				<legend><strong>Update Franchisee</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> Franchisee ID: </label> <DropdownComponent ids={franchisees.map(({ franchisee_id }) => franchisee_id)} onSelect={setUpdateFranchiseeId}/>
					<label> First Name </label> <input type="text" name="firstName" onChange={(e) => setUpdateFirstName(e.target.value)}></input>
					<label> Last Name </label> <input type="text" name="lastName" onChange={(e) => setUpdateLastName(e.target.value)}></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveFranchisee" value="Save Update Franchisee" onClick={(handleUpdate)}></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default Franchisees;