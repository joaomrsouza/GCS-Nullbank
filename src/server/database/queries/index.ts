import * as agencias from "./agencias";
import * as clientes from "./clientes";
import * as contas from "./contas";
import * as dependentes from "./dependentes";
import * as funcionarios from "./funcionarios";
import * as transacoes from "./transacoes";

export type OpResponse = {
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  info: string;
  insertId: number;
  serverStatus: number;
  warningStatus: number;
};

export type CountResponse = [{ count: number }];

export const databaseQueries = {
  agencias,
  clientes,
  contas,
  dependentes,
  funcionarios,
  transacoes,
};
