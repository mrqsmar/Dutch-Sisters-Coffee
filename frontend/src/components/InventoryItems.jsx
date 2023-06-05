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

  // Adding 3 elements to the form
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [remainingStock, setRemainingStock] = useState('');


  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://flip2.engr.oregonstate.edu:8299/inventory_items/`, {
        item_name: itemName,
        item_price: itemPrice,
        remaining_stock: remainingStock
      });
       window.location.reload()
     } catch (err) {
       console.log(err);
     }
   };

  
  const [updateInventoryItemsId, setUpdateInventoryItemsId] = useState('')
  const [updateItemName, setUpdateItemName] = useState('');
  const [updateItemPrice, setUpdateItemPrice] = useState('');
  const [updateRemainingStock, setUpdateRemainingStock] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://flip2.engr.oregonstate.edu:8299/inventory_items/`, {
        item_id: updateInventoryItemsId,
        item_name: updateItemName,
        item_price: updateItemPrice,
        remaining_stock: updateRemainingStock
      });
      window.location.reload()
    } catch (err) {
     console.log(err);
    }
  };
  return (
    <div>
      <h1>Inventory Items</h1>
      <h2>Browse, Add, Update or Delete Inventory Items</h2>
      <div className="inventoryItems">
        <table border="1" cellpadding="5">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Price</th>
			      <th>Remaining Stock</th>
          </tr>
          {inventoryItems.map((inventoryItems) => (
            <tr key={inventoryItems.item_id}>
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
        <form id="addInventoryItem">
          <legend><strong>Add Inventory Item</strong></legend>
          <fieldset class="fields">
            <label> Item Name </label> <input type="text" name="itemName" onChange={(e) => setItemName(e.target.value)}></input>
            <label> Item Price </label> <input type="text" name="itemPrice" onChange={(e) => setItemPrice(e.target.value)}></input>
			      <label> Remaining Stock </label> <input type="text" name="remainingStock" onChange={(e) => setRemainingStock(e.target.value)}></input>
          </fieldset>
          <input class="btn" type="submit" id="addInventoryItem" value="Add Inventory Item" onClick={(handleAdd)}></input>
        </form>
      </div>
      <br></br>

      {/* Editing a Inventory Item form */}
      <form id="UpdateInventoryItem">
				<legend><strong>Update Inventory Item</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> Item ID: </label> <DropdownComponent ids={inventoryItems.map(({ item_id }) => item_id)} onSelect={setUpdateInventoryItemsId}/>
					<label> Item Name </label> <input type="text" name="itemName" onChange={(e) => setUpdateItemName(e.target.value)}></input>
					<label> Item Price </label> <input type="text" name="itemPrice" onChange={(e) => setUpdateItemPrice(e.target.value)}></input>
					<label> Remaining Stock </label> <input type="text" name="remainingStock" onChange={(e) => setUpdateRemainingStock(e.target.value)}></input>
				</fieldset>
				<input class="btn" type="submit" id="UpdateInventoryItem" value="Save Update Inventory Item" onClick={(handleUpdate)}></input>
			</form> 
      <br></br>
    </div>
  );
};

export default InventoryItems;