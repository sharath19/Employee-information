var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongojs = require('mongojs');
var db = mongojs('mongodb://sharath:******@ds019058.mlab.com:19058/contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/contactlist', function (req, res) {
  
  db.contactlist.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/contactlist', function (req, res) {
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {firstName: req.body.firstName,lastName: req.body.lastName, email: req.body.email, number: req.body.number,ssn:req.body.ssn,status:req.body.status}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});
var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log("Server running on port 3000");
});