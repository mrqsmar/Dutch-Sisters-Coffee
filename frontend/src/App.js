import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header.js';
import Footer from './components/Footer';
import Cafes from './components/Cafes';

function App() {
  return (
    <div className="App">
      <Header />
      
      <BrowserRouter>
        <Routes>
          <Route path="/cafes" element={<Cafes />} />

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
