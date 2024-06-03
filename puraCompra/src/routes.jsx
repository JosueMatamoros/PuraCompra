import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import RegisterAccount from "./components/login/RegisterAccount";
import Products from "./pages/Products";
import Account from "./pages/Account";
import Shop from "./pages/Shop";
import InternalView from "./components/products/InternalView"; 
import Payment from "./pages/Payment";
import AdminUsers from "./components/adminDashboard/AdminUsers";
import AdminContent from "./components/adminDashboard/AdminContent";


const Ruting = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/header" element={<Header />} />
            <Route path="/register" element={<RegisterAccount />} />
            <Route path="/products" element={<Products />} />
            <Route path="/account" element={<Account />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<InternalView />} /> 
            <Route path="/payment" element={<Payment />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/adminContent" element={<AdminContent />} />
        </Routes>
    </Router>
);

export default Ruting;
