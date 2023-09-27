import React from "react";
import { useTable, useSortBy } from "react-table";
import transition from "../transition";
import { Link } from "react-router-dom";

const Ranking = () => {
  // Suponhamos que você tenha uma lista de jogadores com seus nomes e pontuações
  const players = [
    { name: "Jogador 1", score: 99 },
    { name: "Jogador 2", score: 85 },
    { name: "Jogador 3", score: 70 },
    // Adicione mais jogadores conforme necessário
  ];

  // Crie uma estrutura de dados para a tabela usando o react-table
  const data = React.useMemo(() => players, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Posição",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Nome do Jogador",
        accessor: "name",
      },
      {
        Header: "Pontuação",
        accessor: "score",
      },
    ],
    []
  );

  // Use o react-table para criar a tabela e habilitar a classificação
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: [{ id: "score", desc: true }], // Classifique inicialmente pela pontuação decrescente
    },
    useSortBy
  );

  return (
    <div className="container_ranking">
      <h2>Classificação</h2>
      <table className="ranking-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ▼"
                        : " ▲"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link className="nav-link" to="/">
        Home
      </Link>
    </div>
  );
};

export default transition(Ranking);
