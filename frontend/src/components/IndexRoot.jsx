const IndexRoot = () => { 
	return (
	  <div className = "index-root">
		<h2><a href="/cafes">Cafes</a></h2>
		<p>You can create a cafe id, and add the address to the table!</p>
		<h2><a href="/cafes_franchisees">Cafes and Franchisees</a></h2>
		<p>You can create a cafe id from the cafe table and franchisee id from the franchisee table!</p>
		<h2><a href="/dues_owed">Dues Owed</a></h2>
		<p>You can create a due owed id, the due amount, the date and the late fee, there is also the franchisee id from the franchisee table!</p>
		<h2><a href="/franchisees">Franchisees</a></h2>
		<p>You can create id, as well as the name of the franchisee!</p>
		<h2><a href="/inventory_items">Inventory Items</a></h2>
		<p>You can create id, the item name, price and remaining stock!</p>
		<h2><a href="/inventory_orders">Inventory Orders</a></h2>
		<p>You can create id, item ordered from the inventory item page, quantity ordered and the amount thats due!</p>
		<h2><a href="/sale_items">Sale Items</a></h2>
		<p>You can create the item name and price!</p>
		<h2><a href="/sales">Sales</a></h2>
		<p> You can create an amount, date, and take the sale item id from the sale item table, and the cafe id from the cafe table </p>
	  </div>
	)
  }
  
  export default IndexRoot;