import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref as databaseRef, query, orderByChild, get } from "firebase/database";
import { database } from "../firebase";
import transition from "../transition";

const Ranking = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Carregue a lista de usuários do Firebase e ordene por pontuação crescente
    const usuariosRef = databaseRef(database, "usuarios");
    const usuariosQuery = query(usuariosRef, orderByChild("pontuacao"));

    get(usuariosQuery).then((snapshot) => {
      if (snapshot.exists()) {
        // Transforme os dados do snapshot em um array de usuários
        const usuariosArray = [];
        snapshot.forEach((childSnapshot) => {
          const usuario = childSnapshot.val();
          usuariosArray.push(usuario);
        });
        // Defina os usuários no estado
        setUsuarios(usuariosArray);
      }
    });
  }, []);

  // Defina as colunas da tabela
  const columns = [
    {
      Header: "Posição",
      accessor: (row, index) => index + 1,
    },
    {
      Header: "Nome do Jogador",
      accessor: "nome",
    },
    {
      Header: "Tempo",
      accessor: "pontuacao",
    },
  ];

  return (
    <div className="container_ranking">
      <h2>Classificação</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.Header}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.nome}>
              <td>{index + 1}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.pontuacao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link className="nav-link" to="/">
        Home
      </Link>
    </div>
  );
};

export default transition(Ranking, "#5adbe4");
