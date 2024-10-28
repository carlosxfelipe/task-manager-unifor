const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/tarefas", (req, res) => {
  connection.query("SELECT * FROM tarefa", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar tarefas" });
      return;
    }
    res.json(results);
  });
});

app.post("/tarefas", (req, res) => {
  const { titulo, descricao } = req.body;
  const query = "INSERT INTO tarefa (titulo, descricao) VALUES (?, ?)";
  connection.query(query, [titulo, descricao], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao criar tarefa" });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.get("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM tarefa WHERE tarefa_id = ?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erro ao buscar tarefa" });
        return;
      }
      res.json(result[0]);
    }
  );
});

app.put("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const query =
    "UPDATE tarefa SET titulo = ?, descricao = ?, data_edicao = NOW() WHERE tarefa_id = ?";
  connection.query(query, [titulo, descricao, id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao atualizar tarefa" });
      return;
    }
    res.json({ message: "Tarefa atualizada com sucesso" });
  });
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tarefa WHERE tarefa_id = ?";
  connection.query(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: "Erro ao deletar tarefa" });
      return;
    }
    res.json({ message: "Tarefa deletada com sucesso" });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
