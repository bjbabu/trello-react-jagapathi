import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BoardsBody from "./components/BoardsBody";
import Cards from "./components/Cards";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<BoardsBody />}></Route>
        <Route path='/boards' element={<BoardsBody />}></Route>
        <Route path='/boards/:id' element={<Cards />}></Route>
      </Routes>
    </>
  );
}

export default App;
