const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs  } = request.body;

  const indexRepository = repositories.findIndex(repositorie => repositorie.id === id);

  if(indexRepository < 0 ){
      return response.status(400).json({error:'Repositorio não encontrado.'});
  }

  const repositorie = { id, title, url, techs, likes: repositories[indexRepository].likes };

  repositories[indexRepository] = repositorie;

  return response.json(repositorie); 
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex(repositorie => repositorie.id == id);

  if(projectIndex < 0 ){
      return response.status(400).json({error:'Repositorio não encontrado.'});
  }

  repositories.splice(projectIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const indexRepository = repositories.findIndex(repositorie => repositorie.id === id);

  if(indexRepository < 0 ){
      return response.status(400).json({error:'Repositorio não encontrado.'});
  }

  repositories[indexRepository].likes += 1;
  return response.json( repositories[indexRepository] ); 
});

module.exports = app;