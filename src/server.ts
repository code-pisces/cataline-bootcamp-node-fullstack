import express from "express"; // const express = require('express');
import { v4 as uuid } from "uuid";
import cors from "cors";

const app = express();

app.use(cors()); // significa { origin: '*' } todos os sites podem acessar
app.use(express.json());

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

// Métodos HTTP -> GET | POST | PUT | DELETE
app.get("/users", (request, response) => {
  // retornar os users
  return response.json(users);
}); // sem barra no final, uma barra significa que é para receber um parâmetro

app.post("/users", (request, response) => {
  // receber os dados do novo usuário
  const { name, email } = request.body;

  // criar novo usuário
  const user = { id: uuid(), name, email };

  // registrar user na base de dados
  users.push(user);

  // retorna os dados para quem fez a requisição
  return response.json(user);
});

app.put("/users/:id", (request, response) => {
  // receber os dados do usuário
  const { id } = request.params;
  const { name, email } = request.body;

  // localizar o usuário na base de dados
  const userIndex = users.findIndex((user) => user.id === id); // -1

  // se o usuário não existir, retornar um erro
  if (userIndex < 0) {
    return response.status(404).json({ error: "User not found." });
  }

  // retornar o usuário atualizado
  const user = { id, name, email };
  users[userIndex] = user;

  return response.json(user);
});

app.delete("/users/:id", (request, response) => {
  // receber id do usuário
  const { id } = request.params;

  // localizar o usuário na base de dados
  const userIndex = users.findIndex((user) => user.id === id); // -1

  // se o usuário não existir, retornar um erro
  if (userIndex < 0) {
    return response.status(404).json({ error: "User not found." });
  }

  users.splice(userIndex, 1);

  return response.status(204).send();
});

app.listen("3333", () => {
  console.log("Back-end Started!");
});
