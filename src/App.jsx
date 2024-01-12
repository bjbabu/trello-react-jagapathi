/* eslint-disable no-undef */
import "./App.css";
import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BoardsBody from "./components/BoardsBody";
import Lists from "./components/Lists";

export const Context = React.createContext();

function App() {
  const [listOfBoards, setListOfBoards] = useState([]);
  const [handleError, setHandleError] = useState("");

  return (
    <>
      <Context.Provider
        value={[listOfBoards, setListOfBoards, handleError, setHandleError]}
      >
        <Navbar />
        <Routes>
          <Route path='/' element={<BoardsBody />}></Route>
          <Route path='/boards' element={<BoardsBody />}></Route>
          <Route path='/boards/:id' element={<Lists />}></Route>
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
