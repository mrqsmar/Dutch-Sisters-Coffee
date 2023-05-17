const Header = (props) => { 
  return (
    <div>
      <h1>{props.title}</h1>
      <p>Use the links below to find the page you need:</p>
      <nav>[ <a href="/cafes">Cafes</a> | <a href="./cafes_franchisees">Cafes and Franchisees</a> | <a href="/dues_owed">Dues Owed</a> | <a href="/franchisees">Franchisees</a> | <a href="/inventory_items">Inventory Items</a> |  <a href="/inventory_orders">Inventory Orders</a> | <a href="/sale_items">Sale Items</a> | <a href="/sales">Sales</a> ] </nav>
    </div>
  )
}

export default Header;