var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Contato = require('./app/models/contato');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://amartiniano:abc123@ds018508.mlab.com:18508/contato-api', {    
    useNewUrlParser: true
});





app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.port || 8000;

//Rotas

var router  = express.Router();

router.use(function(req, res, next) {
    console.log('Running');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Bem vindo(a) a nossa Api de Contatos' })
});
//API
router.route('/contatos')

//Create Contato
.post(function(req, res) {
    var contato = new Contato();

    contato.nome = req.body.nome;
    contato.canal = req.body.canal;
    contato.valor = req.body.valor;

    contato.save(function(error) {
        if(error)
            res.send('Erro ao tentar salvar o Contato....: ' + error);
        
        res.json({ message: 'Contato Cadastrado com Sucesso!' });
    });
})

//GET ALL
.get(function(req, res) {
    Contato.find(function(error, contatos) {
        if(error) 
            res.send('Erro ao tentar Selecionar Todos os contatos...: ' + error);

        res.json(contatos);
    });
});

router.route('/contatos/:contato_id')    
    
//GET por ID
.get(function (req, res) {
        Contato.findById(req.params.contato_id, function(error, contato) {
            if(error)
                res.send('Id do Contato não encontrado....: ' + error);

            res.json(contato);
        });
    })

    //Update Contato
    .put(function(req, res) {        
        Contato.findById(req.params.contato_id, function(error, contato) {
            if (error) 
                res.send("Id do Contato não encontrado....: " + error);

                //Segundo: 
                contato.nome = req.body.nome;
                contato.canal = req.body.canal;
                contato.valor = req.body.valor;

                //Terceiro: Agora que já atualizamos os dados, vamos salvar as propriedades:
                contato.save(function(error) {
                    if(error)
                        res.send('Erro ao atualizar o contato....: ' + error);

                    res.json({ message: 'Contato atualizado com sucesso!' });
                });
            });
        })
//Delete Contato
        .delete(function(req, res) {
            
            Contato.remove({
                _id: req.params.contato_id
                }, function(error) {
                    if (error) 
                        res.send("Id do Contato não encontrado....: " + error);

                    res.json({ message: 'Contato Excluído com Sucesso!' });
                });
            });


app.use('/api', router);

app.listen(port);
console.log("Iniciando a app na porta" + port);