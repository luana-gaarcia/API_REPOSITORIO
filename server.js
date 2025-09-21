import express from 'express'
import cors from 'cors'
import pkg from '@prisma/client'
const { PrismaClient } = pkg
const prisma = new PrismaClient()

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// GET /cadastro - lista todos os usuários
app.get('/cadastro', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    return res.status(200).json(usuarios)
  } catch (error) {
    console.error('Erro GET /cadastro:', error)
    return res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})


// POST /cadastro - cadastra novo usuário
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, idade, email } = req.body

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }
    if (idade !== undefined && Number(idade) < 0) {
  return res.status(400).json({ error: 'Idade não pode ser negativa' })
    }


    const usuarioCriado = await prisma.usuario.create({
      data: {
        nome,
        idade: String(idade),
        email
      }
    })

    return res.status(201).json(usuarioCriado)
  } catch (error) {
    console.error('Erro POST /cadastro:', error)
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' })
  }
})

// DELETE /cadastro/:id - exclui usuário pelo ID
app.delete('/cadastro/:id', async (req, res) => {
  try {
    const { id } = req.params

    await prisma.usuario.delete({
      where: { id }
    })

    return res.status(200).json({ message: 'Usuário removido' })
  } catch (error) {
    console.error('Erro DELETE /cadastro/:id:', error)
    return res.status(500).json({ error: 'Erro ao excluir usuário' })
  }
})

// PUT /cadastro/:id - atualiza usuário pelo ID
app.put('/cadastro/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, idade, email } = req.body

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' })
    }

    if (idade !== undefined && Number(idade) < 0) {
    return res.status(400).json({ error: 'Idade não pode ser negativa' })
}


    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        idade: String(idade),
        email
      }
    })

    return res.status(200).json(usuarioAtualizado)
  } catch (error) {
    console.error('Erro PUT /cadastro/:id:', error)
    return res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
})

// Porta do servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

