var mongoose = require('mongoose');

var Task_listSchema = new mongoose.Schema({
    id: String,
    backlog: [{ name:String, color:String}],
    todo : [{ name:String, color:String}],
    inprogress:  [{ name:String, color:String}],
    done:  [{ name:String, color:String}]
})
var Task_list = mongoose.model('Task_list',Task_listSchema);

module.exports=Task_list;
