const express = require('express');
const app = express();


/**Importando banco de dados */
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "193572",
    database: "crudgames",
});

/**cors é para evitar erros nas integrações entre back e front */
app.use(cors());

/**Para ler os dados no front tem que transformar em json como abaixo */
app.use(express.json());

/**Abaixo adicionando dados no banco */
app.post("/register", (req, res) => {
    /**pegando dados que vem do front para o req */
    const name = req.body.name;
    const cost = req.body.cost;
    const category = req.body.category;

    let SQL = "INSERT INTO games ( name, cost, category ) VALUES ( ?,?,? )";
    /**O valor passado aqui entre conchetes é os que vão ser passado nas interrogações acima respectivamente */
    db.query(SQL, [name, cost, category], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

/**Abaixo pegando dados no banco */
app.get("/getCards", (req, res) => {
    let SQL = "SELECT * from games";
    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
});

/**Abaixo a função de editar os dados */
app.put("/edit", (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const cost = req.body.cost
    const category = req.body.category

    let SQL =
        "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?";

    db.query(SQL, [name, cost, category, id], (err, result) => {
        if (err) {
            res.send(err)
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

/**Abaixo a função de deletar os dados */
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    let SQL = "DELETE FROM games WHERE idgames = ?"
    db.query(SQL, [id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Servidor rodando")
})
