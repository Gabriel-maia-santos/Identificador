import React from "react";
import transition from "../transition";

import imagem from "../assets/images/4apples.png";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="container">
        <img className="imagem" src={imagem} alt="imagem" />
        <Link className="botao_pages2" to="/ranking"></Link>
      </div>
    </>
  );
};
export default transition(Contact, "#b342ca");
