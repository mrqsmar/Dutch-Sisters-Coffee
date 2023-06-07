import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const Sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchAllSales = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_DB_URL + `sales`);
        setSales(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSales();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_DB_URL + `sales/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


  const [saleAmount, setSaleAmount] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [saleItemId, setSaleItemId] = useState('');
  const [cafeId, setCafeId] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      await axios.post(process.env.REACT_APP_DB_URL + `sales`, {
        sale_amount: saleAmount,
        sale_date: saleDate,
        sale_item_id: saleItemId,
        cafe_id: cafeId
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const [updateSaleId, setUpdateSaleId] = useState('');
  const [updateSaleAmount, setUpdateSaleAmount] = useState('');
  const [updateSaleDate, setUpdateSaleDate] = useState('');
  const [updateSaleItemId, setUpdateSaleItemId] = useState('');
  const [updateCafeId, setUpdateCafeId] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await axios.put(process.env.REACT_APP_DB_URL + `sales`, {
        sale_id: updateSaleId,
        sale_amount: updateSaleAmount,
        sale_date: updateSaleDate,
        sale_item_id: updateSaleItemId,
        cafe_id: updateCafeId
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="entity-page">
      <h1>Sales</h1>
      <h2>Browse, Add, Update or Delete Sales</h2>
      <div className="table-container">
        <table border="1" cellpadding="5">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Sale Amount</th>
            <th>Sale Date</th>
            <th>Sale Item ID</th>
            <th>Cafe ID</th>
          </tr>
          {sales.map((sales) => (
            <tr key={sales.sale_id}>
              <button className="delete" onClick={() => handleDelete(sales.sale_id)}>Delete</button>
              <td>{sales.sale_id}</td>
              <td>{sales.sale_amount}</td>
              <td>{sales.sale_date}</td>
              <td>{sales.sale_item_id}</td>
              <td>{sales.cafe_id || "NULL"}</td>
            </tr>
          ))}
        </table>
      </div>

      {/* Adding a new Sale form */}
      <div className="form-container">
        <form id="addSale">
        	<legend><strong>Add Sale</strong></legend>
			    <fieldset class="fields">
            <label className="form-label"> Sale Amount </label> <input type="text" name="saleAmount" className="form-input" onChange={(e) => setSaleAmount(e.target.value)}></input>
            
            {/* Should be a date input */}
            <label className="form-label"> Sale Date </label> <input type="date" name="saleDate" className="form-input" onChange={(e) => setSaleDate(e.target.value)}></input> 

            {/* Should be a dropdown of all items available, since this is a fk */}
            <label className="form-label"> Sale Item Sold </label> <DropdownComponent ids={sales.map(({ sale_item_id }) => sale_item_id)} onSelect={setSaleItemId}/>
            {/* Should be a dropdown of all cafes available, since this is a fk */}
            <label className="form-label"> Cafe ID </label> <DropdownComponent ids={sales.map(({ cafe_id }) => cafe_id)} onSelect={setCafeId}/>
		
          </fieldset>
          <input class="form-btn" type="submit" id="addSale" value="Add Sale" onClick={handleAdd}></input>
        </form>
      </div>
      <br></br>

      {/* Editing a Sale form */}
      <div className="form-container">
        <form id="UpdateSales">
          <legend><strong>Update Sale</strong></legend>
          <fieldset class="fields">
            <input type="hidden"></input>
            <label className="form-label"> Sale ID: </label> <DropdownComponent ids={sales.map(({ sale_id }) => sale_id)} onSelect={setUpdateSaleId}/>
            <label className="form-label"> Sale Amount </label> <input type="text" name="saleAmount" className="form-input" onChange={(e) => setUpdateSaleAmount(e.target.value)}></input>
            <label className="form-label"> Sale Date </label> <input type="date" name="saleDate" className="form-input" onChange={(e) => setUpdateSaleDate(e.target.value)}></input>
            <label className="form-label"> Sale Item Sold </label> <input type="text" name="itemSold" className="form-input" onChange={(e) => setUpdateSaleItemId(e.target.value)}></input>
            <label className="form-label"> Cafe ID </label> <DropdownComponent ids={sales.map(({ cafe_id }) => cafe_id)} onSelect={setUpdateCafeId}/>
          </fieldset>
          <input class="form-btn" type="submit" id="UpdateSaveSales" value="Save Update Sale" onClick={handleUpdate}></input>
        </form> 
      </div>
      <br></br>
    </div>
  );
};

export default Sales;