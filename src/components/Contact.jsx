import React, { useState, useEffect } from "react";
import transition from "../transition";
import imagem from "../assets/images/livro.png";
import imagemResposta from "../assets/images/respostalivro.png";
import Swal from 'sweetalert2';
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
  const [pontuacao, setPontuacao] = useState(0);
  const [tempo, setTempo] = useState(0);

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
      const jogou = localStorage.getItem("Jogou"); // ou de onde você o obtém
      // Registre o momento em que o link foi clicado

      if(jogou == "sim"){
        return navigate("/Jogo3");
      }
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

                setTempo(tempoDecorridoSegundos)
                console.log(valorTotal)

                // Atualize a pontuação no Firebase
                const usuarioKey = childSnapshot.key; // Obtenha a chave do usuário
                const atualizacao = {};
                atualizacao[`usuarios/${usuarioKey}/pontuacao`] = valorTotal;

                update(databaseRef(database), atualizacao)
                  .then(() => {
                    Swal.fire({
                      title: 'Sucesso!',
                      text: `Tempo registrado com sucesso! Sua nova pontuação é de ${valorTotal}.`,
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
          {pontuacao == 0 ? (
            <>
            <p style={{color: "black", margin: '30px'}}>Encontre um livro vermelho na imagem a seguir</p>
          <img className="imagem" src={imagem} alt="imagem" />
          <button className="botao_pages2" onClick={handleCliqueNoLink}>
         
          </button>
            
            </>
          ) : (<>
            <img className="imagem" src={imagemResposta} alt="imagem" />
            <p style={{color: "black", marginTop: '30px'}}>Tempo que o Tensorflow demorou para identificar o objeto: 0.23 segundos</p>
            <p style={{color: "black"}}>Seu tempo foi de {tempo} segundos</p>
            <Link to="/Jogo3">
              Próxima página
            </Link>
              
              </>)}
        </div>
      </div>
    </>
  );
};

export default transition(Contact, "#b342ca");
