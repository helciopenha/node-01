const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: v4(), title: title, url: url, techs: techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  const repository = {
    id,
    title,
    url,
    techs
  };

  repositories[repositoryIndex]['title'] = repository.title;
  repositories[repositoryIndex]['url'] = repository.url;
  repositories[repositoryIndex]['techs'] = repository.techs;
  
  const result = repositories[repositoryIndex];

  return response.json(result);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories[repositoryIndex].likes += 1;

  const repository = repositories[repositoryIndex];

  return response.json(repository);

});

module.exports = app;
