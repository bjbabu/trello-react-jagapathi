/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import BoardsBody from "./components/BoardsBody";
import Lists from "./components/Lists";
import { getBoards } from "./components/API";

export const Context = React.createContext();

function App() {
  const id = import.meta.env.VITE_ID;
  const [listOfBoards, setListOfBoards] = useState([]);
  const [handleError, setHandleError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards(id));
  }, []);

  // const boardsData = useSelector((state) => state.boards);
  // console.log(boardsData);

  // function handleData(data) {
  //   setListOfBoards(data);
  // }

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
