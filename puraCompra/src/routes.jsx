import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/header/Header";
import RegisterAccount from "./components/login/RegisterAccount";

const Ruting = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/header" element={<Header />} />
            <Route path="/register" element={<RegisterAccount />} />
        </Routes>
    </Router>
);

export default Ruting;