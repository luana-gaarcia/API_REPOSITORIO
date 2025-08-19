import express from 'express'

import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

// objeto da biblioteca
const app = express()

//indica q vai usar o json
app.use(express.json())

// rotas
app.get('/cadastro', async (req, res) => {
    
    const listaUsuarios = await prisma.usuario.findMany()

    res.status(200).json(listaUsuarios)
}) //rota get, coloca 'como pega ela', funcao callback (requisicao, reposta)

app.post('/cadastro', async (req, res) => {
    //criando
    await prisma.usuario.create({
        //um bjeto q esta esperando
        data:{
            //campos:
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    })
    //res.status(201).send('tudo ok com post')
    res.status(201).json(req.body)
})

// porta local do servidor
app.listen(3000, () => {
    console.log('servidor rodando')
}) //fica de olho na porta, pode trabalhar com 2 parametros porta, call back
// PORTA LOCAL DO SERVIDOR
app.listen(3000,()=>{
    console.log('SERVIDOR ESTÁ RODANDO')
})
