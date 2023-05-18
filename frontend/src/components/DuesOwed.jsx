import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const DuesOwed = () => {
  const [duesOwed, setDuesOwed] = useState([]);

  useEffect(() => {
    const fetchAllDuesOwed = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/dues_owed");
        setDuesOwed(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllDuesOwed();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/dues_owed/${id}`);
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
      <h1>Dues Owed</h1>
      <div className="duesOwed">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newDuesOwed()">New</a></th>
            <th></th>
            <th>id</th>
            <th>franchisee_id</th>
            <th>amount_due</th>
            <th>due_date</th>
            <th>late_fees</th>
          </tr>


          {duesOwed.map((duesOwed) => (
              <tr key={duesOwed.dues_invoice_id}>
                <td><a href="#" onClick="editDuesOwed()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(duesOwed.dues_invoice_id)}>Delete</button>
                <td>{duesOwed.dues_invoice_id}</td>
                <td>{duesOwed.franchisee_id}</td>
                <td>{duesOwed.amount_due}</td>
                <td>{duesOwed.due_date}</td>
                <td>{duesOwed.late_fees}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a new Due Owed form */}
      <div>
        <form method="POST" id="addDueOwed">
        	<legend><strong>Add Dues Owed</strong></legend>
			<fieldset class="fields">
				<label> ID: </label> <DropdownComponent ids={duesOwed.map(({ dues_invoice_id }) => dues_invoice_id)} />
				<label> amount due </label> <input type="text" name="amountDue"></input>
				<label> due date </label> <input type="text" name="dueDate"></input>
				<label> late fees </label> <input type="text" name="lateFees"></input>
			</fieldset>
			<input class="btn" type="submit" id="addDueOwed" value="Add Due Owed"></input>
		</form>
      </div>
      
      <br></br>

      {/* Editing a Due Owed form */}
      <form method="PUT" id="UpdateDuesOwed">
				<legend><strong>Update Due Owed</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={duesOwed.map(({ dues_invoice_id }) => dues_invoice_id)} />
					<label> amount due </label> <input type="text" name="amountDue" value='temp'></input>
					<label> due date </label> <input type="text" name="dueDate" value='temp'></input>
					<label> late fees </label> <input type="text" name="lateFees" value='temp'></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveDuesOwed" value="Save Update Dues Owed"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default DuesOwed;