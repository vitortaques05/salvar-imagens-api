const express = require('express')
const cors = require('cors')
const fs = require('fs')

const dados = require('./dados.json')


const server = express()
server.use(express.json())
server.use(cors())

server.listen(3000, () => {
    console.log('O servidor está funcionando');
});

server.get('/Imagens', (req, res) => {
    return res.json(dados.Imagens)
});


//SELECT * FROM CLIENTES

//Create da API
server.post('/imagens', (req, res) => {
    const novaImagem = req.body


    if (!novaImagem.link || !novaImagem.url || !novaImagem.descricao) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        // Adicionar a nova imagem aos dados existentes.
        dadosImagens.push(novaImagem);
        // Salvar os dados atualizados.
        salvarDadosImagens(dadosImagens);
    
        return res.status(201).json({ mensagem: "Dados completos, imagem cadastrada com sucesso" });
    }
})

//Read da API
server.get('/imagens', (req, res) => {
    return res.json(dados.Imagens)
})

//Funcao que salva os dados
function salvarDadosImagens() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2))
}

//Update da API
server.put('/imagens/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const atualizarImagens = req.body

    const indiceImagem = dados.Imagem.findIndex(c => c.id === id)

    if (indiceImagem === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" })
    } else {
        dados.Imagens[indiceImagem].nome = atualizarClient.link || dados.Imagems[indiceImagem].link
        dados.Imagens[indiceImagem].url = atualizarClient.url || dados.Imagems[indiceImagem].url
        dados.Imagens[indiceImagem].descricao = atualizarClient.email || dados.Imagems[indiceImagem].descricao

        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completo, dados atualizados com sucesso" })
    }
})

// Delete da API
server.delete('/imagens/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //filtrar as imagens, removendo pelo id correspondente

    dados.Imagens = dados.Imagens.filter(c => c.id !== id)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "Imagem excluída com sucesso" })
})
