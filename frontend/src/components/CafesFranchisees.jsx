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
        const res = await axios.get(process.env.REACT_APP_DB_URL + `cafes_franchisees`);
        setCafesFranchisees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCafesFranchisees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_DB_URL + `cafes_franchisees/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // These 2 track the cafe id and franchisee id from the add form
  const [franchiseeId, setFranchiseeId] = useState('');
  const [cafeId, setCafeId] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.REACT_APP_DB_URL + `cafes_franchisees/`, {
        franchisee_id: franchiseeId,
        cafe_id: cafeId
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


  // These 3 track the id, cafe id and franchisee id from the update form
  const [updateId, setUpdateId ] = useState('');
  const [updateFranchiseeId, setUpdateFranchiseeId] = useState('');
  const [updateCafeId, setUpdateCafeId] = useState('');
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(process.env.REACT_APP_DB_URL + `cafes_franchisees/`, {
        id: updateId,
        franchisee_id: updateFranchiseeId,
        cafe_id: updateCafeId
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="entity-page">
      <h1>Cafes Franchisees</h1>
      <h2>Browse, Add, Update or Delete Cafes / Franchisees</h2>
      <div className="table-container">
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
                <td>{cafesFranchisees.franchisee_id}</td>
                <td>{cafesFranchisees.cafe_id}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a new cafesFranchisees form */}
      <div className="form-container">
        <form id="addCafesFranchisees">
        	<legend><strong>Add Cafe Franchisees</strong></legend>
			    <fieldset class="fields">
				
            {/* Should be a dropdown of all cafes available, since this is a fk */}
            <label className="form-label"> Cafe ID </label> <DropdownMenuField ids={cafesFranchisees.map(({ cafe_id }) => cafe_id)} onSelect={setCafeId} />

            {/* Should be a dropdown of all franchisees available, since this is a fk */}
            <label className="form-label"> Franchisee ID </label> <DropdownMenuField ids={cafesFranchisees.map(({ franchisee_id }) => franchisee_id)} onSelect={setFranchiseeId} />
      
          </fieldset>
          <input class="form-btn" type="submit" id="addCafesFranchisees" value="Add Cafe Franchisee" onClick={handleAdd}></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a line item form */}
      <div className="form-container">
        <form id="UpdateCafeFranchisee">
          <legend><strong>Update Cafe Franchisee</strong></legend>
          <fieldset class="fields">
            <label className="form-label"> ID: </label> <DropdownMenuField ids={cafesFranchisees.map(({ id }) => id)} onSelect={setUpdateId} />

              {/* Should be a dropdown of all cafes available, since this is a fk */}
              <label className="form-label"> Cafe ID </label> <DropdownMenuField ids={cafesFranchisees.map(({ cafe_id }) => cafe_id)} onSelect={setUpdateCafeId} />

              {/* Should be a dropdown of all franchisees available, since this is a fk */}
              <label className="form-label"> Franchisee ID </label> <DropdownMenuField ids={cafesFranchisees.map(({ franchisee_id }) => franchisee_id)} onSelect={setUpdateFranchiseeId} />

          </fieldset>
            <input class="form-btn" type="submit" id="UpdateCafeFranchisees" value="Save Cafes Franchisee" onClick={handleUpdate}></input>
        </form> 
      </div>
      <br></br>
    </div>
  );
};

export default CafesFranchisees;