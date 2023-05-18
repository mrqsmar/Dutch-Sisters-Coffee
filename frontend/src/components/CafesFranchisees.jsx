import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const CafesFranchisees = () => {
  const [cafesFranchisees, setCafesFranchisees] = useState([]);

  useEffect(() => {
    const fetchAllCafesFranchisees = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/cafes_franchisees");
        setCafesFranchisees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCafesFranchisees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/cafes_franchisees/${id}`);
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
      <h1>Cafes Franchisees</h1>
      <div className="cafesFranchisees">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newCafesFranchisees()">New</a></th>
            <th></th>
            <th>id</th>
            <th>franchisee_id</th>
            <th>cafe_id</th>
          </tr>

          {cafesFranchisees.map((cafesFranchisees) => (
              <tr key={cafesFranchisees.id}>
                <td><a href="#" onClick="editCafesFranchisees()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(cafesFranchisees.id)}>Delete</button>
                <td>{cafesFranchisees.id}</td>
                <td>{cafesFranchisees.franchisee_id}</td>
                <td>{cafesFranchisees.cafe_id}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a new cafesFranchisees form */}
      <div>
        <form method="POST" id="addCafesFranchisees">
        	<legend><strong>Add Cafe Franchisees</strong></legend>
			<fieldset class="fields">
				
				{/* Should be a dropdown of all cafes available, since this is a fk */}
				<label> cafe id </label> <input type="text" name="cafeId"></input> 

				{/* Should be a dropdown of all franchisees available, since this is a fk */}
				<label> franchisee id </label> <input type="text" name="franchiseeId"></input> 
		
			</fieldset>
			<input class="btn" type="submit" id="addCafesFranchisees" value="Add Cafe Franchisee"></input>
		</form>
      </div>
      
      <br></br>

      {/* Editing a line item form */}
      <form method="PUT" id="UpdateCafeFranchisee">
				<legend><strong>Update Cafe Franchisee</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={cafesFranchisees.map(({ id }) => id)} />
					
					{/* Should be a dropdown of all cafes available, since this is a fk */}
					<label> cafe id </label> <input type="text" name="cafeId" value='temp'></input>

					{/* Should be a dropdown of all franchisees available, since this is a fk */}
					<label> franchisee id </label> <input type="text" name="franchiseeId" value='temp'></input>


				</fieldset>
					<input class="btn" type="submit" id="UpdateCafeFranchisees" value="Save Cafes Franchisee"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default CafesFranchisees;