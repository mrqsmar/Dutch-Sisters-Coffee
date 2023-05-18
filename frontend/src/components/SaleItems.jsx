import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const SaleItems = () => {
  const [saleItems, setSaleItems] = useState([]);

  useEffect(() => {
    const fetchAllSaleItems = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/sale_items");
        setSaleItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSaleItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/sale_items/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  // const handleAdd = async (id) => {
  //   try {
  //     await axios.put(`http://flip2.engr.oregonstate.edu:8299/sale_items/`);
  //     window.location.reload()
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <h1>Sale Items</h1>
      <div className="saleItems">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newSaleItem()">New</a></th>
            <th></th>
            <th>id</th>
            <th>item_name</th>
            <th>item_price</th>
          </tr>


          {saleItems.map((saleItems) => (
              <tr key={saleItems.sale_item_id}>
                <td><a href="#" onClick="editCafe()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(saleItems.sale_item_id)}>Delete</button>
                <td>{saleItems.sale_item_id}</td>
                <td>{saleItems.item_name}</td>
                <td>{saleItems.item_price}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a Sale Item form */}
      <div>
        <form method="POST" id="addSaleItem">
          <legend><strong>Add Sale Item</strong></legend>
          <fieldset class="fields">
            <label> item name </label> <input type="text" name="itemName"></input>
            <label> item price </label> <input type="text" name="itemPrice"></input>
          </fieldset>
          <input class="btn" type="submit" id="addSaleItem" value="Add Sale Item"></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a Sale Item form */}
      <form method="PUT" id="UpdateSaleItem">
				<legend><strong>Update Sale Item</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={saleItems.map(({ sale_item_id }) => sale_item_id)} />
					<label> item name </label> <input type="text" name="itemName" value="temp"></input>
					<label> item price </label> <input type="text" name="itemPrice" value="temp"></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateSaleItem" value="Save Update Sale Item"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default SaleItems;