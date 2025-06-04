import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.js';
import Footer from './components/Footer';
import IndexRoot from './components/IndexRoot';
import Cafes from './components/Cafes';
import Franchisees from './components/Franchisees';
import DuesOwed from './components/DuesOwed';
import Sales from './components/Sales';
import SaleItems from './components/SaleItems';
import InventoryItems from './components/InventoryItems';
import InventoryOrders from './components/InventoryOrders';
import CafesFranchisees from './components/CafesFranchisees';


function App() {
  return (
    <div className="App">
      <Header />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexRoot />} />
          <Route path="/cafes" element={<Cafes />} />
          <Route path="/franchisees" element={<Franchisees />} />
          <Route path="/dues_owed" element={<DuesOwed />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sale_items" element={<SaleItems />} /> 
          <Route path="/inventory_items" element={<InventoryItems />} /> 
          <Route path="/inventory_orders" element={<InventoryOrders />} /> 
          <Route path="/cafes_franchisees" element={<CafesFranchisees />} /> 
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
