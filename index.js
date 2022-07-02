var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
var path    = require('path');


// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Create new users -- create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password).then((user) => {
        console.log(user);
        res.send(user);
    });
});

//Withdraw 
app.get('/account/withdraw/:email/:amount', function (req, res) {
    console.log('Withdraw request');
    dal.withdraw(req.params.email, req.params.amount).then((balance) => {
        console.log('new balance: ', balance);
        res.send(balance);
    })
});

//Deposit
app.get('/account/deposit/:email/:amount', function (req, res) {
    console.log('Withdraw request');
    dal.deposit(req.params.email, req.params.amount).then((balance) => {
        console.log('new balance: ', balance);
        res.send(balance);
    })
});

// All Acounts
app.get('/account/all', function (req, res) {
    console.log('account all');
    dal.all().
    then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});


//app.post('/')

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port: ' + port);