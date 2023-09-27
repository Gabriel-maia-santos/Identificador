import React from "react";
import transition from "../transition";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <Link to="/about">
          <h1>Jogo</h1>
        </Link>
      </div>
    </>
  );
};

export default transition(Home, "#287aa0");
