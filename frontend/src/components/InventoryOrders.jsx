import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownComponent from './DropdownMenuField'
import { __RouterContext } from "react-router";

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

  const [cafeId, setCafeId] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantityOrdered, setQuantityOrdered] = useState('');
  const [amountDue, setAmountDue] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://flip2.engr.oregonstate.edu:8299/inventory_orders", {
        cafe_id: cafeId,
        item_id: itemId,
        quantity_ordered: quantityOrdered,
        amount_due: amountDue
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };


  const [updateOrderId, setUpdateOrderId] = useState('');
  const [updateCafeId, setUpdateCafeId] = useState('');
  const [updateItemId, setUpdateItemId] = useState('');
  const [updateQuantityOrdered, setUpdateQuantityOrdered] = useState('');
  const [updateAmountDue, setUpdateAmountDue] = useState('');
  

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await axios.put("http://flip2.engr.oregonstate.edu:8299/inventory_orders", {
        order_id: updateOrderId,
        cafe_id: updateCafeId,
        item_id: updateItemId,
        quantity_ordered: updateQuantityOrdered,
        amount_due: updateAmountDue
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div>
      <h1>Inventory Orders</h1>
      <h2>Browse, Add, Update or Delete Inventory Orders</h2>
      <div className="inventoryOrders">
        <table border="1" cellpadding="5">
          <tr>
            <th><a href="#" onClick="newInventoryOrder())">New</a></th>
            <th></th>
            <th>ID</th>
            <th>Cafe ID</th>
            <th>Item Ordered</th>
            <th>Quantity Ordered</th>
            <th>Amount Due</th>
          </tr>
          {inventoryOrders.map((inventoryOrders) => (
              <tr key={inventoryOrders.order_id}>
                <td><a href="#" onClick="editInventoryItem()">Edit</a></td>
                <button className="delete" onClick={() => handleDelete(inventoryOrders.order_id)}>Delete</button>
                <td>{inventoryOrders.order_id}</td>
                <td>{inventoryOrders.cafe_id}</td>
                <td>{inventoryOrders.item_id}</td>
                <td>{inventoryOrders.quantity_ordered}</td>
                <td>{inventoryOrders.amount_due}</td>
            </tr>
        ))}
        </table>
      </div>

      {/* Adding a Inventory Order form */}
      <div>
        <form id="addInventoryOrder">
          <legend><strong>Add Inventory Order</strong></legend>
          <fieldset class="fields">

			{/* This should be a drop down of all the cafes, fk */}
            <label> Cafe ID </label> <DropdownComponent ids={inventoryOrders.map(({ cafe_id }) => cafe_id)} onSelect={setCafeId}/>

			{/* This should be a drop down of all the item ids, fk */}
            <label> Item Ordered </label> <DropdownComponent ids={inventoryOrders.map(({ item_id }) => item_id)} onSelect={setItemId}/>
			      <label> Quantity Ordered </label> <input type="text" name="quantityOrdered" onChange={(e) => setQuantityOrdered(e.target.value)}></input>
			      <label> Amount Due </label> <input type="text" name="amountDue" onChange={(e) => setAmountDue(e.target.value)}></input>
          </fieldset>
          <input class="btn" type="submit" id="addInventoryOrder" value="Add Inventory Order" onClick={(handleAdd)}></input>
        </form>
      </div>
      
      <br></br>

      {/* Editing a Inventory Order form */}
      <form id="UpdateInventoryOrder">
				<legend><strong>Update Inventory Order</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> ID: </label> <DropdownComponent ids={inventoryOrders.map(({ order_id }) => order_id)} onSelect={setUpdateOrderId}/>

					{/* This should be a drop down of all the cafes, fk */}
					<label> Cafe ID </label> <DropdownComponent ids={inventoryOrders.map(({ cafe_id }) => cafe_id)} onSelect={setUpdateCafeId}/>
					{/* This should be a drop down of all the item ids, fk */}
					<label> Item Ordered </label> <DropdownComponent ids={inventoryOrders.map(({ item_id }) => item_id)} onSelect={setUpdateItemId}/>
					<label> Quantity Ordered </label> <input type="text" name="quantityOrdered" onChange={(e) => setUpdateQuantityOrdered(e.target.value)}></input>
			    <label> Amount Due </label> <input type="text" name="amountDue" onChange={(e) => setUpdateAmountDue(e.target.value)}></input>
				</fieldset>
					<input class="btn" type="submit" id="UpdateInventoryOrder" value="Save Update Inventory Order" onClick={(handleUpdate)}></input>
			</form> 
      
      <br></br>

    </div>
  );
};

export default InventoryOrders;