import express from 'express'
import { createConnection } from 'mysql2'
const app = express()
const port = 3000

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
      console.log(results)
      res.send(`
        <h1>Full Cycle Rocks!</h1>
        <p>- Lista de nomes cadastrada no banco de dados.</p>
        <ol>
          ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
        </ol>
      `)
      conn.end();
    }
  })
})


app.listen(port, () => {
  console.log(`Rodando na porta  ${port}`)
})
