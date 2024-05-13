import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./components/login/Login";
import SingIn from "./components/login/SignIn";
import Header from "./components/header/Header";

const Ruting = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<SingIn />} />
            <Route path="/header" element={<Header />} />
        </Routes>
    </Router>
);

export default Ruting;