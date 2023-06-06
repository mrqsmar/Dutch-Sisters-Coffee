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
        const res = await axios.get(process.env.REACT_APP_DB_URL + `inventory_items`);
        setInventoryItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllInventoryItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_DB_URL + `inventory_items/${id}`);
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
      await axios.post(process.env.REACT_APP_DB_URL + `inventory_items/`, {
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
      await axios.put(process.env.REACT_APP_DB_URL + `inventory_items/`, {
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
    <div className="entity-page">
      <h1>Inventory Items</h1>
      <h2>Browse, Add, Update or Delete Inventory Items</h2>
      <div className="table-container">
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
      <div className="form-container">
        <form id="addInventoryItem">
          <legend><strong>Add Inventory Item</strong></legend>
          <fieldset class="fields">
            <label className="form-label"> Item Name </label> <input type="text" name="itemName" className="form-input" onChange={(e) => setItemName(e.target.value)}></input>
            <label className="form-label"> Item Price </label> <input type="text" name="itemPrice" className="form-input" onChange={(e) => setItemPrice(e.target.value)}></input>
			      <label className="form-label"> Remaining Stock </label> <input type="text" name="remainingStock" className="form-input" onChange={(e) => setRemainingStock(e.target.value)}></input>
          </fieldset>
          <input class="form-btn" type="submit" id="addInventoryItem" value="Add Inventory Item" onClick={(handleAdd)}></input>
        </form>
      </div>
      <br></br>

      {/* Editing a Inventory Item form */}
      <div className="form-container">
        <form id="UpdateInventoryItem">
          <legend><strong>Update Inventory Item</strong></legend>
          <fieldset class="fields">
            <input type="hidden"></input>
            <label className="form-label"> Item ID: </label> <DropdownComponent ids={inventoryItems.map(({ item_id }) => item_id)} onSelect={setUpdateInventoryItemsId}/>
            <label className="form-label"> Item Name </label> <input type="text" name="itemName" className="form-input" onChange={(e) => setUpdateItemName(e.target.value)}></input>
            <label className="form-label"> Item Price </label> <input type="text" name="itemPrice" className="form-input" onChange={(e) => setUpdateItemPrice(e.target.value)}></input>
            <label className="form-label"> Remaining Stock </label> <input type="text" name="remainingStock" className="form-input" onChange={(e) => setUpdateRemainingStock(e.target.value)}></input>
          </fieldset>
          <input class="form-btn" type="submit" id="UpdateInventoryItem" value="Save Update Inventory Item" onClick={(handleUpdate)}></input>
        </form> 
      </div>
      <br></br>
    </div>
  );
};

export default InventoryItems;