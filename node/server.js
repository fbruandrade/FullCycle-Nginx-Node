import express from 'express'
import { createConnection } from 'mysql2'
import formidable from "express-formidable";

const app = express()
const port = 3000

app.use(express.json())
app.use(formidable());
const people = [];

const dataBaseConfig = {
  connectionLimit : 10,
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

app.get('/', (req, res) => {

  const conn = createConnection(dataBaseConfig);

  conn.connect();

  conn.query('SELECT * FROM people', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <h2>- Lista de nomes cadastrada no banco de dados.</h2>
        <ol>
          ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
        </ol>
        <h2>- Inserir Nomes na aplicação.</h2>
        <p>
          <form action="/" method="post">
            <label for="name">Nome:</label><br />
            <input type="text" id="name" name="name"><br />
            <input type="submit" value="Cadastrar">
          </form>
        </p>
      `)
      conn.end();
    }
  })
})


app.post('/', (req, res) => {
  console.log(req.fields)

  const { name } = req.fields;

  const conn = createConnection(dataBaseConfig);

  conn.connect();

  conn.query(`INSERT INTO people(name) VALUES("${name}")`, (err, results) => {
    if (err) {
      console.log(`Nome ${name} foi cadastrado!`)
    } else {
      console.log(results)
      res.redirect('/')
      conn.end();
    }
  })
})


app.listen(port, () => {
  console.log(`Rodando na porta  ${port}`)
})
