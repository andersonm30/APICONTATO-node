var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContatoSchema = new Schema({
    nome: String,
    canal: String,
    valor: String
});

module.exports = mongoose.model('Contato', ContatoSchema);