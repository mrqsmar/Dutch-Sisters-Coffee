import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.js';
import Footer from './components/Footer';
import IndexRoot from './components/IndexRoot';
import Cafes from './components/Cafes';
import Franchisees from './components/Franchisees';


function App() {
  return (
    <div className="App">
      <Header />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexRoot />} />
          <Route path="/cafes" element={<Cafes />} />
          <Route path="/franchisees" element={<Franchisees />} />

          {/* Todo, finish the rest of the routes and tables */}

          {/* <Route path="/cafes_franchisees" element={<Cafes />} />
          <Route path="/dues_owed" element={<Cafes />} />
          <Route path="/franchisees" element={<Cafes />} />
          <Route path="/inventory_items" element={<Cafes />} />
          <Route path="/inventory_orders" element={<Cafes />} />
          <Route path="/sales" element={<Cafes />} />
          <Route path="/sale_items" element={<Cafes />} /> */}


        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
