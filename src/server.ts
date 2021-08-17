import express from "express"; // const express = require('express');

const app = express();

// Métodos HTTP -> GET | POST | PUT | DELETE

app.get("/users", (request, response) => {
  return response.json(["usuário 1", "usuário 2"]);
}); // sem barra no final, uma barra significa que é para receber um parâmetro

app.post("/users", (request, response) => {
  return response.json({ message: "Criando usuário" });
});

app.put("/users", (request, response) => {
  return response.json({ message: "Atualizando usuário" });
});

app.delete("/users", (request, response) => {
  return response.json({ message: "Excluindo usuário" });
});

app.listen("3333", () => {
  console.log("Back-end Started!");
});
