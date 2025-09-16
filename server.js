import express from 'express'
import cors from 'cors'

import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

// objeto da biblioteca teste
const app = express()
app.use(express.json())
app.use(cors())

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

app.put('/cadastro/:id', async (req, res) => {
    
    await prisma.usuario.update({
        //mostra onde tem q mudar
        where:{
            id: req.params.id
        },
        data:{
            email: req.body.email,
            nome: req.body.nome,
            idade: req.body.idade
        }
    })
    
    //pega o parametro id do params
    //console.log(req.params.id)
    res.status(201).json({"message":"cliente atualizado"})
})

app.delete('/cadastro/:id', async (req, res) => {
    
    await prisma.usuario.delete({
        //mostra onde tem q mudar
        where:{
            id: req.params.id
        }
    })
    
    res.status(200).json({"message":"cliente removido"})
})

// porta local do servidor
app.listen(3000, () => {
    console.log('servidor rodando')
}) 
//fica de olho na porta, pode trabalhar com 2 parametros porta, call back