import express from 'express'
const app = express()

app.use(express.json())

const usuarios = []

// ROTAS
app.get('/cadastro',(req,res)=>{
    //res.send('DEU CERTO COM O GET')
    res.status(200).send(usuarios)
})

app.post('/cadastro',(req,res)=>{
    //console.log(req.body)
    usuarios.push(req.body)
   //res.status(201).send('DEU CERTO COM O POST')
   res.status(201).json(req.body)
   
})


// PORTA LOCAL DO SERVIDOR
app.listen(3000,()=>{
    console.log('SERVIDOR ESTÁ RODANDO')
})
