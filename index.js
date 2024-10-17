const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  connection.query("SELECT * FROM tarefa", (err, results) => {
    if (err) throw err;
    res.render("index", { tarefas: results });
  });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const { titulo, descricao } = req.body;
  const query = "INSERT INTO tarefa (titulo, descricao) VALUES (?, ?)";
  connection.query(query, [titulo, descricao], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM tarefa WHERE tarefa_id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.render("edit", { tarefa: result[0] });
    }
  );
});

app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  const query =
    "UPDATE tarefa SET titulo = ?, descricao = ? WHERE tarefa_id = ?";
  connection.query(query, [titulo, descricao, id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tarefa WHERE tarefa_id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
