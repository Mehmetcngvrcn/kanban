var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
    name: String,
    board_color: String,
    board_border_color: String,
    board_text_color: String
})
var board = mongoose.model('board',boardSchema);

module.exports=board;
