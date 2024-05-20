import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import RegisterAccount from "./components/login/RegisterAccount";
import Products from "./pages/Products";
import Account from "./pages/Account";

const Ruting = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/header" element={<Header />} />
            <Route path="/register" element={<RegisterAccount />} />
            <Route path="/products" element={<Products />} />
            <Route path="/account" element={<Account/>} />
        </Routes>
    </Router>
);

export default Ruting;