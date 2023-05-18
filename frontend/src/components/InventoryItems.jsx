import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const InventoryItems = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    const fetchAllInventoryItems = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/inventory_items");
        setInventoryItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllInventoryItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/inventory_items/${id}`);
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
      <h1>Inventory Items</h1>
      <div className="inventoryItems">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newInventoryItem()">New</a></th>
            <th></th>
            <th>id</th>
            <th>item_name</th>
            <th>item_price</th>
			<th>remaining_stock</th>
          </tr>


          {inventoryItems.map((inventoryItems) => (
              <tr key={inventoryItems.item_id}>
                <td><a href="#" onClick="editInventoryItem()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(inventoryItems.item_id)}>Delete</button>
                <td>{inventoryItems.item_id}</td>
                <td>{inventoryItems.item_name}</td>
                <td>{inventoryItems.item_price}</td>
				<td>{inventoryItems.remaining_stock}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a Inventory Item form */}
      <div>
        <form method="POST" id="addInventoryItem">
          <legend><strong>Add Inventory Item</strong></legend>
          <fieldset class="fields">
            <label> item name </label> <input type="text" name="itemName"></input>
            <label> item price </label> <input type="text" name="itemPrice"></input>
			<label> remaining stock </label> <input type="text" name="remainingStock"></input>
          </fieldset>
          <input class="btn" type="submit" id="addInventoryItem" value="Add Inventory Item"></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a Inventory Item form */}
      <form method="PUT" id="UpdateInventoryItem">
				<legend><strong>Update Inventory Item</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={inventoryItems.map(({ item_id }) => item_id)} />
					<label> item name </label> <input type="text" name="itemName" value="temp"></input>
					<label> item price </label> <input type="text" name="itemPrice" value="temp"></input>
					<label> remaining stock </label> <input type="text" name="remainingStock" value="temp"></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateInventoryItem" value="Save Update Inventory Item"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default InventoryItems;