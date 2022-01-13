var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());

//mongoose schema ları
const Board = require('./board');
const Task_list = require('./task-list');

mongoose.connect("mongodb+srv://mehmet:mehmet123@cluster0.pskcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", err => {
    if (err) {
        throw err;
    }
    console.log("Mongoose Database");
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.get("/api/board", function (req, res) {
    Board.find({}, (err, data) => {
        if (err) {
            res.status(404).send(err);
            throw err;
        }
        res.status(200).json(data);
    })
});
app.get("/api/task-list", function (req, res) {
    Task_list.find({}, (err, data) => {
        if (err) {
            res.status(404).send(err);
            throw err;
        }
        res.status(200).json(data);
    })
});
app.get("/api/board/:id", function (req, res) {
    const id = req.params.id;
    Board.find({}, (err, data) => {
        if (err) {
            res.status(404).send(err);
            throw err;
        }
        data = data.find(data => data.id == id);
        if (data) {
            res.status(200).json(data);
        }
        else {
            res.status(404).send("board not found");
        }
    })
});
app.get("/api/task-list/:id", function (req, res) {
    const id = req.params.id;
    Task_list.find({ id: id }, (err, data) => {
        if (err) {
            res.status(404).send(err);
            throw err;
        }
        if (data) {
            res.status(200).json(data[0]);
        }
        else {
            res.status(404).send("task-list not found");
        }
    })
});
app.post("/api/board", function (req, res) {
    var data = new Board(req.body);
    if (data.name != null && data.board_color != null && data.board_border_color != null && data.board_text_color != null) {
        data.save(err => {
            if (err) {
                res.status(404).send(err);
                throw err;
            }
            var task_list = new Task_list({
                id: data.id
            })
            task_list.save(err => {
                if (err) {
                    res.status(404).send(err);
                }
                res.status(200).json(data.id);
            })
        });
    }
    else {
        res.status(404).send('missing properties default = {"name":"<name>","board_color":"bg-dark","board_border_color":"","board_text_color":"text-light"}');
    }
});
app.put("/api/task-list", function (req, res) {
    if (req.body.id!=null) {
        Task_list.find({ id: req.body.id }, (err, data) => {
            if (err) {
                res.status(404).send(err);
                throw err;
            }
            if (data) {
                data = data[0];
                data.todo = req.body.todo;
                data.backlog = req.body.backlog;
                data.inprogress = req.body.inprogress;
                data.done = req.body.done;
                data.save(err => {
                    if (err) {
                        res.status(404).send(err);
                        throw err;
                    }
                    res.status(200).json(data);
                })
            }
            else {
                res.status(404).send("task-list not found");
            }
        })
    }
    else{
        res.status(404).send('missing properties default : {"id":"<id>","todo":[{"name":"<name>","color":"success"}]}');
    }
})
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("server port : ", port);
});
