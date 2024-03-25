const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 30001
mongoose.connect('mongodb+srv://23rcvictor:c48UxcEf6JCvuigV@bibilhotecadb.lobhoq6.mongodb.net/?retryWrites=true&w=majority&appName=BibilhotecaDB');

const LivroModel = mongoose.model('Livro', { 
    title: String,
    autor: String,
    type: String,
    url_image: String,
    quantidade: Number
  });


  app.get('/Teste', (req, res) => {
    res.send('Onlineeee')
  })


app.get('/Biblioteca', async (req, res) => {
    const livros  = await LivroModel.find();
    res.send(livros);
  })

  app.delete("/:id", async (req, res) => {
    const livros = await LivroModel.findByIdAndDelete (req.params.id)
     res.send(livros);

  } )


  app.put("/:id", async (req, res) => {
    const livros = await LivroModel.findByIdAndUpdate (req.params.id, {
      title: req.body.title,
      autor: req.body.autor,
      type: req.body.type,
      url_image: req.body.url_image,
      quantidade: req.body.quantidade
    })

     res.send(livros);

  } )

app.post('/', async (req, res) => {
    const novoLivro = new LivroModel({
        title: req.body.title,
        autor: req.body.autor,
        type: req.body.type,
        url_image: req.body.url_image,
        quantidade: req.body.quantidade
      });

      await novoLivro.save();
      res.send(novoLivro);
  
  })



app.listen(port, () => {
  console.log(`executando ${port}`)
})
