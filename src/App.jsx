/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BoardsBody from "./components/BoardsBody";
import Lists from "./components/Lists";
import { getBoards } from "./components/API";

export const Context = React.createContext();

function App() {
  const id = import.meta.env.VITE_ID;
  const [listOfBoards, setListOfBoards] = useState([]);
  const [handleError, setHandleError] = useState("");

  useEffect(() => {
    getBoards(id, handleData, setHandleError);
  }, []);

  function handleData(data) {
    setListOfBoards(data);
  }

  return (
    <>
      <Context.Provider
        value={[listOfBoards, setListOfBoards, handleError, setHandleError]}
      >
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Navbar />
                <BoardsBody />
              </>
            }
          ></Route>
          <Route
            path='/boards'
            element={
              <>
                <Navbar />
                <BoardsBody />
              </>
            }
          ></Route>
          <Route
            path='/boards/:id'
            element={
              <>
                <Navbar />
                <Lists />
              </>
            }
          ></Route>
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
