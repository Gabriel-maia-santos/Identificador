import React, { useState, useEffect } from "react";
import transition from "../transition";
import imagem from "../assets/images/carros.png";
import imagemResposta from "../assets/images/resposta.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
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
  const [pontuacao, setPontuacao] = useState(0);
  const [tempo, setTempo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Registre o momento em que a página "About" é carregada
    const startTime = new Date().getTime();
    setTempoCarregamento(startTime);
  }, []);

  const handleCliqueNoLink = () => {
    if (tempoCarregamento) {
      const nomeUsuario = localStorage.getItem("nomeUsuario"); // ou de onde você o obtém
      const jogou = localStorage.getItem("Jogou"); // ou de onde você o obtém
      // Registre o momento em que o link foi clicado

      if(jogou == "sim"){
        return navigate("/contact");
      }
      const tempoClique = new Date().getTime();

      // Calcule o tempo decorrido em milissegundos
      const tempoDecorrido = tempoClique - tempoCarregamento;

      // Converta o tempo decorrido para segundos
      const tempoDecorridoSegundos = Math.round(tempoDecorrido / 1000);

      setTempo(tempoDecorridoSegundos)
      // Obtenha o nome do usuário do localStorage ou do Firebase

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
                Swal.fire({
                  title: 'Sucesso!',
                  text: `Tempo registrado com sucesso! Sua nova pontuação é de ${novaPontuacao} segundos.`,
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then(() => {
                  // Redirecione o usuário para a próxima página aqui, se necessário
                  // navigate("/ranking");
                  setPontuacao(1);
                });
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
        {pontuacao == 0 ? (
            <>
            <p style={{color: `black`, margin: `30px`, display: `flex`, flexDirection: `row`, justifyContent: `center`}}>Encontre um carro nesta imagem</p>
          <img className="imagem" src={imagem} alt="imagem" />
          <button className="botao_pages" onClick={handleCliqueNoLink}>
          </button>
            
            </>
          ) : (<>
            <img className="imagem" src={imagemResposta} alt="imagem" />
            <p style={{color: "black", marginTop: '30px'}}>Tempo que o Tensorflow demorou para identificar o objeto: 0.23 segundos</p>
            <p style={{color: "black"}}>Seu tempo foi de {tempo} segundos</p>
            <Link to="/contact">
              Próxima página
            </Link>
              
              
              </>)}
        </div>
      </div>
    </>
  );
};

export default transition(About, "#249729");
