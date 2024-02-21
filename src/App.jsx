import "./App.css";
import "./index.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Tabula from "./components/Tabula";
import ParMani from "./components/ParMani";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Nav />

      <Routes>
        <Route path="/" element={<ParMani />} />
        <Route path="/parmani" element={<ParMani />} />
        <Route path="/tabula" element={<Tabula />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
