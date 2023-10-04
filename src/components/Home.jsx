import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { get, query, orderByChild, equalTo, ref as databaseRef, push } from "firebase/database";
import { database } from "../firebase";

const Home = () => {
  const [nome, setNome] = useState("");
  const [usuarioCadastrado, setUsuarioCadastrado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifique se o nome do usuário já foi cadastrado no localStorage
    const nomeLocalStorage = localStorage.getItem("nomeUsuario");
    if (nomeLocalStorage) {
      setUsuarioCadastrado(true);
      setNome(nomeLocalStorage);
    }
  }, []);

  const handleCadastroUsuario = () => {
    const usuariosRef = databaseRef(database, 'usuarios');

    const usuarioQuery = query(usuariosRef, orderByChild('nome'), equalTo(nome));

    get(usuarioQuery).then((snapshot) => {
      if (snapshot.exists()) {
        // Se o usuário já existe, não faça nada
        alert('Este usuário já está cadastrado.');
      } else {
        // Se o usuário não existe, adicione um novo usuário à lista
        const novaPontuacao = 0;
        const novoUsuario = {
          nome: nome,
          pontuacao: novaPontuacao
        };

        // Adicione o novo usuário à lista no Firebase
        push(usuariosRef, novoUsuario)
          .then(() => {
            alert('Usuário cadastrado com sucesso!');
            // Salve o nome do usuário no localStorage
            localStorage.setItem("nomeUsuario", nome);
            setUsuarioCadastrado(true);
            // Redirecione para a próxima página após o cadastro
            navigate("/about");
          })
          .catch((error) => {
            console.error('Erro ao cadastrar usuário: ', error);
          });
      }
    });
  };

  return (
    <>
      <div>
        {usuarioCadastrado ? (
          <div className="alinhar">
            <p className="welcome">Bem-vindo, {nome}!</p>
          </div>
        ) : (
          <div className="input_name">


            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              />

            <button className="button_input" onClick={handleCadastroUsuario}>Cadastrar Usuário</button>
          </div>
        )}
      </div>
      <div>
        {usuarioCadastrado && (
          <Link to="/about">
            <h1>START</h1>
          </Link>
        )}
      </div>
    </>
  );
};

export default Home;
