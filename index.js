const express = require('express')
const cors = require('cors')
const supabase = require('./src/services/supabase')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// APP LISTEN
app.listen(port,
  () => {
    console.log(`Aplicación corriendo en el puerto ${port}`)
  })

// RUTA POR DEFECTO
app.get('/', function (req, res, next) {
  next()
})
// RUTA HUNTERS
app.get('/api/cazadores', async function (req, res) {
  const { data: personajes } = await supabase
    .from('personajes')
  res.json(personajes)
})
// RUTA POR DEFECTO
app.get('/api/cazadores/:name', async function (req, res) {
  const name = req.params.name
  const { data: cazador } = await supabase
    .from('personajes')
    .select('*')
    .ilike('nombre', `%${name}%`)
  res.json(cazador)
})

app.use((req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'src/public/404.html'))
})
module.exports = app
