import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'

const InventoryOrders = () => {
  const [inventoryOrders, setInventoryOrders] = useState([]);

  useEffect(() => {
    const fetchAllInventoryOrders = async () => {
      try {
        const res = await axios.get("http://flip2.engr.oregonstate.edu:8299/inventory_orders");
        setInventoryOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllInventoryOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://flip2.engr.oregonstate.edu:8299/inventory_orders/${id}`);
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
      <h1>Inventory Orders</h1>
      <div className="inventoryOrders">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newInventoryOrder())">New</a></th>
            <th></th>
            <th>id</th>
            <th>cafe_id</th>
            <th>item_ordered</th>
			<th>quantity_ordered</th>
			<th>amount_due</th>
          </tr>


          {inventoryOrders.map((inventoryOrders) => (
              <tr key={inventoryOrders.order_id}>
                <td><a href="#" onClick="editInventoryItem()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(inventoryOrders.order_id)}>Delete</button>
                <td>{inventoryOrders.cafe_id}</td>
                <td>{inventoryOrders.item_ordered}</td>
                <td>{inventoryOrders.quantity_ordered}</td>
				<td>{inventoryOrders.amount_due}</td>
              </tr>
        ))}
        </table>
      </div>

      {/* Adding a Inventory Order form */}
      <div>
        <form method="POST" id="addInventoryOrder">
          <legend><strong>Add Inventory Order</strong></legend>
          <fieldset class="fields">

			{/* This should be a drop down of all the cafes, fk */}
            <label> cafe id </label> <input type="text" name="cafeId"></input>

			{/* This should be a drop down of all the item ids, fk */}
            <label> item ordered </label> <input type="text" name="itemOrdered"></input>

			<label> quantity ordered </label> <input type="text" name="quantityOrdered"></input>
			<label> amount due </label> <input type="text" name="amountDue"></input>
          </fieldset>
          <input class="btn" type="submit" id="addInventoryOrder" value="Add Inventory Order"></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a Inventory Order form */}
      <form method="PUT" id="UpdateInventoryOrder">
				<legend><strong>Update Inventory Order</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={inventoryOrders.map(({ order_id }) => order_id)} />

					{/* This should be a drop down of all the cafes, fk */}
					<label> cafe id </label> <input type="text" name="itemName" value="temp"></input>

					{/* This should be a drop down of all the item ids, fk */}
					<label> item ordered </label> <input type="text" name="itemOrdered" value="temp"></input>
					<label> quantity ordered </label> <input type="text" name="quantityOrdered" value="temp"></input>
					<label> amount due </label> <input type="text" name="amountDue" value="temp"></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateInventoryOrder" value="Save Update Inventory Order"></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default InventoryOrders;