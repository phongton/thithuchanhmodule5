import './App.css';
import React from "react"
import ProductListFunc from "./component/product/ProductListFunc";
import ProductCreate from "./component/product/ProductCreate";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";



function App() {


    return (
        <>
            <BrowserRouter>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/product"><span className="material-symbols-outlined">home</span></NavLink>
                    <NavLink className="navbar-brand custom-button" to="/create">Create Product</NavLink>
                </div>
                <Routes>
                    <Route path="/create" element={<ProductCreate/>} />
                    <Route path="/product" element={<ProductListFunc/>} />

                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
