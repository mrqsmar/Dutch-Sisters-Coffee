import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DropdownMenuField from './DropdownMenuField'

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

  // These 2 track the cafe id and franchisee id from the add form
  const [cafeId, setCafeId] = useState('');
  const [franchiseeId, setFranchiseeId] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://flip2.engr.oregonstate.edu:8299/cafes_franchisees/`, {
        cafe_id: cafeId,
        franchisee_id: franchiseeId
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


  // These 3 track the id, cafe id and franchisee id from the update form
  const [updateId, setUpdateId] = useState('');
  const [updateCafeId, setUpdateCafeId] = useState('');
  const [updateFranchiseeId, setUpdateFranchiseeId] = useState('');
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://flip2.engr.oregonstate.edu:8299/cafes_franchisees/`, {
        id: updateId,
        cafe_id: updateCafeId,
        franchisee_id: updateFranchiseeId
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Cafes Franchisees</h1>
      <h2>Browse, Add, Update or Delete Cafe Franchisees</h2>
      <div className="cafesFranchisees">
        <table border="1" cellpadding="5">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Cafe ID</th>
            <th>Franchisee ID</th>
          </tr>

          {cafesFranchisees.map((cafesFranchisees) => (
              <tr key={cafesFranchisees.id}>
                <button className="delete" onClick={() => handleDelete(cafesFranchisees.id)}>Delete</button>
                <td>{cafesFranchisees.id}</td>
                <td>{cafesFranchisees.cafe_id}</td>
                <td>{cafesFranchisees.franchisee_id}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a new cafesFranchisees form */}
      <div>
        <form id="addCafesFranchisees">
        	<legend><strong>Add Cafe Franchisees</strong></legend>
			    <fieldset class="fields">
				
            {/* Should be a dropdown of all cafes available, since this is a fk */}
            <label> Cafe ID </label> <input type="text" name="cafeId" onChange={(e) => setCafeId(e.target.value)}></input> 

            {/* Should be a dropdown of all franchisees available, since this is a fk */}
            <label> Franchisee ID </label> <input type="text" name="franchiseeId" onChange={(e) => setFranchiseeId(e.target.value)}></input> 
      
          </fieldset>
          <input class="btn" type="submit" id="addCafesFranchisees" value="Add Cafe Franchisee" onClick={handleAdd}></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a line item form */}
      <form id="UpdateCafeFranchisee">
				<legend><strong>Update Cafe Franchisee</strong></legend>
				<fieldset class="fields">
          <label> ID: </label> <DropdownMenuField ids={cafesFranchisees.map(({ id }) => id)} onSelect={setUpdateId} />

            {/* Should be a dropdown of all cafes available, since this is a fk */}
            <label> Cafe ID </label> <input type="text" name="cafeId" onChange={(e) => setUpdateCafeId(e.target.value)}></input> 

            {/* Should be a dropdown of all franchisees available, since this is a fk */}
            <label> Franchisee ID </label> <input type="text" name="franchiseeId" onChange={(e) => setUpdateFranchiseeId(e.target.value)}></input> 

				</fieldset>
					<input class="btn" type="submit" id="UpdateCafeFranchisees" value="Save Cafes Franchisee" onClick={handleUpdate}></input>
			</form> 
      <br></br>
    </div>
  );
};

export default CafesFranchisees;