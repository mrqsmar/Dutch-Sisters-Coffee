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
    <div className="entity-page">
      <h1>Dues Owed</h1>
      <h2>Browse, Add, Update or Delete Dues Owed</h2>
      <div className="table-container">
        <table border="1" cellpadding="5">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Franchisee ID</th>
            <th>Amount Due</th>
            <th>Due Date</th>
            <th>Late Fees</th>
          </tr>
          {duesOwed.map((duesOwed) => (
            <tr key={duesOwed.dues_invoice_id}>
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
      <div className="form-container">
        <form id="addDueOwed">
        	<legend><strong>Add Dues Owed</strong></legend>
			    <fieldset class="fields">
            <label className="form-label"> Franchisee ID </label> <DropdownComponent ids={duesOwed.map(({ franchisee_id }) => franchisee_id)} onSelect={setFranchiseeId}/>
            <label className="form-label"> Amount Due </label> <input type="text" name="amountDue" className="form-input" onChange={(e) => setAmountDue(e.target.value)}></input>
            <label className="form-label"> Due Date </label> <input type="text" name="dueDate" className="form-input" onChange={(e) => setDueDate(e.target.value)}></input>
            <label className="form-label"> Late Fees </label> <input type="text" name="lateFees" className="form-input" onChange={(e) => setLateFees(e.target.value)}></input>
          </fieldset>
			    <input class="form-btn" type="submit" id="addDueOwed" value="Add Due Owed" onClick={(handleAdd)}></input>
		    </form>
      </div>      
      <br></br>

      {/* Editing a Due Owed form */}
      <div className="form-container">
        <form id="UpdateDuesOwed">
          <legend><strong>Update Due Owed</strong></legend>
          <fieldset class="fields">
            <input type="hidden"></input>
            <label className="form-label"> Dues Owed ID: </label> <DropdownComponent ids={duesOwed.map(({ dues_invoice_id }) => dues_invoice_id)} onSelect={setUpdateDuesInvoiceId}/>
            <label className="form-label"> Franchisee ID </label> <DropdownComponent ids={duesOwed.map(({ franchisee_id }) => franchisee_id)} onSelect={setUpdateFranchiseeId}/>
            <label className="form-label"> Amount Due </label> <input type="text" name="amountDue" className="form-input" onChange={(e) => setUpdateAmountDue(e.target.value)}></input>
            <label className="form-label"> Due Date </label> <input type="text" name="dueDate" className="form-input" onChange={(e) => setUpdateDueDate(e.target.value)}></input>
            <label className="form-label"> Late Fees </label> <input type="text" name="lateFees" className="form-input" onChange={(e) => setUpdateLateFees(e.target.value)}></input>
          </fieldset>
          <input class="form-btn" type="submit" id="UpdateSaveDuesOwed" value="Save Update Dues Owed" onClick={(handleUpdate)}></input>
        </form> 
      </div>
      <br></br>
    </div>
  );
};

export default DuesOwed;