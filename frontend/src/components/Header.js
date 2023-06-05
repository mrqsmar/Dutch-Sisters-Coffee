const Header = () => { 
  return (
    <div className="header-container">
      <h1>Dutch Girls Coffee Database</h1>
      <nav>
        [ 
          <button className="button-header" onClick={() => { window.location.href = "/cafes"; }}>
            Cafes
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/cafes_franchisees"; }}>
            Cafes and Franchisees
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/dues_owed"; }}>
            Dues Owed
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/franchisees"; }}>
            Franchisees
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/inventory_items"; }}>
            Inventory Items
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/inventory_orders"; }}>
            Inventory Orders
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/sale_items"; }}>
            Sale Items
          </button> |
          <button className="button-header" onClick={() => { window.location.href = "/sales"; }}>
            Sales
          </button>
        ]
      </nav>
    </div>
  );
}

export default Header;