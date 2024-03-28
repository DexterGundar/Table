import "./App.css";
import "./index.css";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Tabula from "./components/Tabula";
import GraphQl from "./components/GraphQl";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Nav />

      <Routes>
        <Route path="/" element={<Tabula />} />
        <Route path="/GraphQl" element={<GraphQl />} />
        <Route path="/tabula" element={<Tabula />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
