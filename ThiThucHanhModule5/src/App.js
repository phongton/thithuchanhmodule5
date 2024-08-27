import './App.css';
import React, {useState} from "react"
import StudentListFunc from "./component/student/StudentListFunc";
import StudentCreate from "./component/student/StudentCreate";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import StudentEdit from "./component/student/StudentEdit";


function App() {


    return (
        <>
            <BrowserRouter>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/student"><span className="material-symbols-outlined">home</span></NavLink>
                    <NavLink className="navbar-brand custom-button" to="/create">Create Student</NavLink>
                </div>
                <Routes>
                    <Route path="/create" element={<StudentCreate/>} />
                    <Route path="/student" element={<StudentListFunc/>} />
                    <Route path="/edit/:id" element={<StudentEdit/>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
