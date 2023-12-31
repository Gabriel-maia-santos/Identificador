import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Ranking from "./components/Ranking";
import Jogo3 from "./components/Jogo3";

function App() {
  const location = useLocation();

  return (
      <>
        {/* <Navbar /> */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />{" "}
            <Route path="/about" element={<About />} />{" "}
            <Route path="/contact" element={<Contact />} />{" "}
            <Route path="/ranking" element={<Ranking />} />{" "}
            <Route path="/Jogo3" element={<Jogo3 />} />{" "}
          </Routes>{" "}
        </AnimatePresence>{" "}
      </>
  );
}

export default App;
