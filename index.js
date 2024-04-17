const express = require('express');
const cors = require('cors');
const fs = require('fs');

const dados = require('./dados.json');

const server = express();
server.use(express.json());
server.use(cors());

server.listen(3000, () => {
    console.log('O servidor está funcionando');
});

server.get('/imagens', (req, res) => {
    return res.json(dados.Imagens);
});

// Create da API
server.post('/imagens', (req, res) => {
    const novaImagem = req.body;

    if (!novaImagem.url || !novaImagem.descricao) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
       
        dados.Imagens.push(novaImagem);
       
        salvarDados();
    
        return res.status(201).json({ mensagem: "Dados completos, imagem cadastrada com sucesso" });
    }
});

// Update da API
server.put('/imagens/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const atualizarImagem = req.body;

    const indiceImagem = dados.Imagens.findIndex(img => img.id === id);

    if (indiceImagem === -1) {
        return res.status(404).json({ mensagem: "Imagem não encontrada" });
    } else {
       
        dados.Imagens[indiceImagem].url = atualizarImagem.url || dados.Imagens[indiceImagem].url;
        dados.Imagens[indiceImagem].descricao = atualizarImagem.descricao || dados.Imagens[indiceImagem].descricao;

        salvarDados();

        return res.status(201).json({ mensagem: "Dados completos, imagem atualizada com sucesso" });
    }
});

// Delete da API
server.delete('/imagens/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Filtrar as imagens, removendo pelo id correspondente
    dados.Imagens = dados.Imagens.filter(img => img.id !== id);

    salvarDados();

    return res.status(200).json({ mensagem: "Imagem excluída com sucesso" });
});

// Função que salva os dados
function salvarDados() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2));
}
