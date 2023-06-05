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


  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://flip2.engr.oregonstate.edu:8299/sale_items", {
        item_name: itemName,
        item_price: itemPrice
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const [updateSaleItemId, setUpdateSaleItemId] = useState('');
  const [updateItemName, setUpdateItemName] = useState('');
  const [updateItemPrice, setUpdateItemPrice] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      await axios.put("http://flip2.engr.oregonstate.edu:8299/sale_items", {   
        sale_item_id: updateSaleItemId,
        item_name: updateItemName,
        item_price: updateItemPrice
      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="entity-page">
      <h1>Sale Items</h1>
      <h2>Browse, Add, Update or Delete Sale Items</h2>
      <div className="table-container">
        <table border="1" cellpadding="5">
          <tr>
            <th></th>
            <th>ID</th>
            <th>Item Name</th>
            <th>item Price</th>
          </tr>
          {saleItems.map((saleItems) => (
            <tr key={saleItems.sale_item_id}>
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
        <form id="addSaleItem">
          <legend><strong>Add Sale Item</strong></legend>
          <fieldset class="fields">
            <label> Item Name </label> <input type="text" name="itemName" onChange={(e) => setItemName(e.target.value)}></input>
            <label> Item Price </label> <input type="text" name="itemPrice" onChange={(e) => setItemPrice(e.target.value)}></input>
          </fieldset>
          <input class="btn" type="submit" id="addSaleItem" value="Add Sale Item" onClick={(handleAdd)}></input>
        </form>
      </div>
      <br></br>

      {/* Editing a Sale Item form */}
      <form id="UpdateSaleItem">
				<legend><strong>Update Sale Item</strong></legend>
				<fieldset class="fields">
					<input type="hidden"></input>
					<label> Sale Item ID: </label> <DropdownComponent ids={saleItems.map(({ sale_item_id }) => sale_item_id)} onSelect={setUpdateSaleItemId}/>
					<label> Item Name </label> <input type="text" name="itemName" onChange={(e) => setUpdateItemName(e.target.value)}></input>
					<label> Item Price </label> <input type="text" name="itemPrice" onChange={(e) => setUpdateItemPrice(e.target.value)}></input>
				</fieldset>
				<input class="btn" type="submit" id="UpdateSaleItem" value="Save Update Sale Item" onClick={(handleUpdate)}></input>
			</form> 
      <br></br>
    </div>
  );
};

export default SaleItems;