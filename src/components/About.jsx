import React, { useState, useEffect } from "react";
import transition from "../transition";
import imagem from "../assets/images/teste2.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  ref as databaseRef,
  push,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import { database } from "../firebase";

const About = () => {
  const [tempoCarregamento, setTempoCarregamento] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Registre o momento em que a página "About" é carregada
    const startTime = new Date().getTime();
    setTempoCarregamento(startTime);
  }, []);

  const handleCliqueNoLink = () => {
    if (tempoCarregamento) {
      // Registre o momento em que o link foi clicado
      const tempoClique = new Date().getTime();

      // Calcule o tempo decorrido em milissegundos
      const tempoDecorrido = tempoClique - tempoCarregamento;

      // Converta o tempo decorrido para segundos
      const tempoDecorridoSegundos = Math.round(tempoDecorrido / 1000);

      // Obtenha o nome do usuário do localStorage ou do Firebase
      const nomeUsuario = localStorage.getItem("nomeUsuario"); // ou de onde você o obtém

      // Certifique-se de que você tem um nome de usuário válido
      if (nomeUsuario) {
        // Obtenha a pontuação atual do usuário
        const usuariosRef = databaseRef(database, "usuarios");
        const usuarioQuery = query(
          usuariosRef,
          orderByChild("nome"),
          equalTo(nomeUsuario)
        );

        get(usuarioQuery).then((snapshot) => {
          if (snapshot.exists()) {
            const usuario = snapshot.val();
            const pontuacaoAtual = usuario.pontuacao || 0;

            // Calcule a nova pontuação somando o tempo decorrido
            const novaPontuacao = pontuacaoAtual + tempoDecorridoSegundos;

            // Atualize a pontuação no Firebase
            const usuarioKey = Object.keys(snapshot.val())[0]; // Obtenha a chave do usuário
            const atualizacao = {};
            atualizacao[`usuarios/${usuarioKey}/pontuacao`] = novaPontuacao;

            update(databaseRef(database), atualizacao)
              .then(() => {
                alert(
                  `Tempo registrado com sucesso! Sua pontuação é agora ${novaPontuacao}.`
                );
                // Redirecione o usuário para a próxima página
                navigate("/contact");
              })
              .catch((error) => {
                console.error("Erro ao registrar tempo: ", error);
              });
          } else {
            alert("Usuário não encontrado.");
          }
        });
      } else {
        alert("Nome de usuário não encontrado.");
      }
    } else {
      alert("Tempo de carregamento não registrado.");
    }
  };

  return (
    <>
      <div className="container_imagem2">
        <div className="container_imagem_padrao">
          <img className="imagem" src={imagem} alt="imagem" />
          <button className="botao_pages" onClick={handleCliqueNoLink}></button>
        </div>
      </div>
    </>
  );
};

export default transition(About, "#249729");
