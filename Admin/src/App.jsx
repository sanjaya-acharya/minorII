import "./App.css";
import MainLayout from "./admin pannel/Pages/MainLayout";
import Adlogin from "./admin pannel/Pages/Adlogin";
import { Routes, Route } from "react-router-dom";
// import Customers from "./admin pannel/Customers";

import Dashboard from "./admin pannel/Pages/Dashboard";
import Orders from "./admin pannel/Pages/Orders";
import Customer from "./admin pannel/Pages/Customer";
import ProductList from "./admin pannel/Pages/ProductList";
import AddProducts from "./admin pannel/Pages/AddProducts";
import { useEffect } from "react";

function App() {
  useEffect(()=>{
    sessionStorage.setItem("adminName", "Sanjaya Acharya");
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customer" element={<Customer />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="addproducts" element={<AddProducts />} />
        </Route>
        <Route path="/adminlogin" element={<Adlogin />} />
      </Routes>
    </>
  );
}

export default App;
