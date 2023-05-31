import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
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

  // These three track the amount due, due date and the late fees from the add form
  const [franchisee_id, setFranchiseeId] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [lateFees, setLateFees] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://flip2.engr.oregonstate.edu:8299/dues_owed/`, {
        franchisee_id: franchisee_id,
        amount_due: amountDue,
        due_date: dueDate,
        late_fees: lateFees
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

    // update
  const [updateDuesInvoiceId, setUpdateDuesInvoiceId] = useState('');
  const [updateFranchiseeId, setUpdateFranchiseeId] = useState('');
  const [updateAmountDue, setUpdateAmountDue] = useState('');
  const [updateDueDate, setUpdateDueDate] = useState('');
  const [updateLateFees, setUpdateLateFees] = useState('');
  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://flip2.engr.oregonstate.edu:8299/dues_owed/`, {
        dues_invoice_id: updateDuesInvoiceId,
        franchisee_id: updateFranchiseeId,
        amount_due: updateAmountDue,
        due_date: updateDueDate,
        late_fees: updateLateFees
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


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
        <form id="addDueOwed">
        	<legend><strong>Add Dues Owed</strong></legend>
			<fieldset class="fields">
        <label> Franchisee ID </label> <DropdownComponent ids={duesOwed.map(({ franchisee_id }) => franchisee_id)} onSelect={setFranchiseeId}/>
				<label> Amount Due </label> <input type="text" name="amountDue" onChange={(e) => setAmountDue(e.target.value)}></input>
				<label> Due Date </label> <input type="text" name="dueDate" onChange={(e) => setDueDate(e.target.value)}></input>
				<label> Late Fees </label> <input type="text" name="lateFees" onChange={(e) => setLateFees(e.target.value)}></input>
			</fieldset>
			<input class="btn" type="submit" id="addDueOwed" value="Add Due Owed" onClick={(handleAdd)}></input>
		</form>
      </div>
      
      <br></br>

      {/* Editing a Due Owed form */}
      <form id="UpdateDuesOwed">
				<legend><strong>Update Due Owed</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> Dues Owed ID: </label> <DropdownComponent ids={duesOwed.map(({ dues_invoice_id }) => dues_invoice_id)} onSelect={setUpdateDuesInvoiceId}/>
          <label> Franchisee ID </label> <DropdownComponent ids={duesOwed.map(({ franchisee_id }) => franchisee_id)} onSelect={setUpdateFranchiseeId}/>
					<label> Amount Due </label> <input type="text" name="amountDue" onChange={(e) => setUpdateAmountDue(e.target.value)}></input>
					<label> Due Date </label> <input type="text" name="dueDate" onChange={(e) => setUpdateDueDate(e.target.value)}></input>
					<label> Late Fees </label> <input type="text" name="lateFees" onChange={(e) => setUpdateLateFees(e.target.value)}></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveDuesOwed" value="Save Update Dues Owed" onClick={(handleUpdate)}></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default DuesOwed;