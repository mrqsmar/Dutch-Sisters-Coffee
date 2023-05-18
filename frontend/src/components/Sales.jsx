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
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/sales");
        setSales(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSales();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/sales/${id}`);
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
      <h1>Sales</h1>
      <div className="sales">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newSale()">New</a></th>
            <th></th>
            <th>id</th>
            <th>same_amount</th>
            <th>item_sold</th>
            <th>cafe_id</th>
          </tr>

          {sales.map((sales) => (
              <tr key={sales.sale_id}>
                <td><a href="#" onClick="editSale()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(sales.sale_id)}>Delete</button>
                <td>{sales.sales_id}</td>
                <td>{sales.sale_amount}</td>
                <td>{sales.item_sold}</td>
                <td>{sales.sale_date}</td>
                <td>{sales.cafe_id}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a new Sale form */}
      <div>
        <form method="POST" id="addSale">
        	<legend><strong>Add Sale</strong></legend>
			<fieldset class="fields">
				<label> sale amount </label> <input type="text" name="saleAmount"></input>
				
				{/* Should be a dropdown of all items available, since this is a fk */}
				<label> item sold </label> <input type="text" name="itemSold"></input> 

				{/* Should be a date input */}
				<label> sale date </label> <input type="text" name="saleDate"></input> 
				
				{/* Should be a dropdown of all cafes available, since this is a fk */}
				<label> cafe id </label> <input type="text" name="cafeId"></input> 
		
			</fieldset>
			<input class="btn" type="submit" id="addSale" value="Add Sale"></input>
		</form>
      </div>
      
      <br></br>

      {/* Editing a Due Owed form */}
      <form method="PUT" id="UpdateSales">
				<legend><strong>Update Sale</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={sales.map(({ sale_id }) => sale_id)} />
					<label> sale amount </label> <input type="text" name="saleAmount" value='temp'></input>
					<label> item sold </label> <input type="text" name="itemSold" value='temp'></input>
					<label> sale date </label> <input type="text" name="saleDate" value='temp'></input>
					<label> cafe id </label> <input type="text" name="cafeId" value='temp'></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaveSales" value="Save Update Sale"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default Sales;