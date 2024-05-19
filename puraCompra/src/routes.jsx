import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import RegisterAccount from "./components/login/RegisterAccount";
import Products from "./pages/Products";
import UserWebPage from "./pages/UserWebPage";

const Ruting = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/header" element={<Header />} />
            <Route path="/register" element={<RegisterAccount />} />
            <Route path="/products" element={<Products />} />
            <Route path="/user" element={<UserWebPage />} />
        </Routes>
    </Router>
);

export default Ruting;