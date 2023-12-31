import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref as databaseRef, query, orderByChild, get, equalTo } from "firebase/database";
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

        // Filtrar os usuários para excluir aqueles cuja pontuação termina com 0
        const usuariosFiltrados = usuariosArray.filter((usuario) => usuario.pontuacao % 10 !== 0);

        // Defina os usuários no estado
        setUsuarios(usuariosFiltrados);
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
      <h2 style={{ color: `white` }}>Classificação</h2>
      <table className="ranking-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th style={{ color: `white` }} key={column.Header}>
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={usuario.nome}>
              <td style={{ color: `white` }}>{index + 1}</td>
              <td style={{ color: `white` }}>{usuario.nome}</td>
              <td style={{ color: `white` }}>{usuario.pontuacao}</td>
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
