import React from "react";
import transition from "../transition";

import imagem from "../assets/images/teste2.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="container_imagem2">
        <img className="imagem" src={imagem} alt="imagem" />
        <Link className="botao_pages" to="/contact">
          
        </Link>
      </div>
    </>
  );
};

export default transition(About);
