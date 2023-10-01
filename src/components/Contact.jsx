import React, { useState, useEffect } from "react";
import transition from "../transition";
import imagem from "../assets/images/4apples.png";
import { Link, useNavigate } from "react-router-dom";
import {
  ref as databaseRef,
  get,
  query,
  orderByChild,
  equalTo,
  update,
} from "firebase/database";
import { database } from "../firebase";

const Contact = () => {
  const [tempoCarregamento, setTempoCarregamento] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Registre o momento em que a página "Contact" é carregada
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
            // Itere pelos filhos do snapshot para acessar o usuário
            snapshot.forEach((childSnapshot) => {
              const usuario = childSnapshot.val();
              if (usuario) {
                // Acesse a pontuação do usuário
                let pontuacaoAtual = usuario.pontuacao || 0; // Defina como 0 se for nulo
                console.log(pontuacaoAtual)

                // Calcule a nova pontuação somando a pontuação atual com o tempo decorrido
                let valorTotal = pontuacaoAtual + tempoDecorridoSegundos;

                console.log(tempoDecorridoSegundos)
                console.log(valorTotal)

                // Atualize a pontuação no Firebase
                const usuarioKey = childSnapshot.key; // Obtenha a chave do usuário
                const atualizacao = {};
                atualizacao[`usuarios/${usuarioKey}/pontuacao`] = valorTotal;

                update(databaseRef(database), atualizacao)
                  .then(() => {
                    alert(
                      `Tempo registrado com sucesso! Sua nova pontuação é ${valorTotal}.`
                    );
                    // Redirecione o usuário para a próxima página
                    navigate("/ranking");
                  })
                  .catch((error) => {
                    console.error("Erro ao registrar tempo: ", error);
                  });
              } else {
                alert("Objeto de usuário é nulo.");
              }
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
      <div className="container">
        <div className="container_imagem_padrao">
          <img className="imagem" src={imagem} alt="imagem" />
          <button className="botao_pages2" onClick={handleCliqueNoLink}>
            Clique aqui
          </button>
        </div>
      </div>
    </>
  );
};

export default transition(Contact, "#b342ca");
