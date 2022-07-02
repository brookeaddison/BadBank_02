const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb+srv://mongo01:mongo01@cluster0.jqttrtw.mongodb.net/test';
//const url         = 'mongodb+srv://mongo01:mongo01@cluster0.jqttrtw.mongodb.net/?retryWrites=true&w=majority';
var   db          = null;
var   client      = new MongoClient(url);

//  connect to mongo
async function connectToMongodb(){
    try { await client.connect();
    db = await client.db("bank_02");
    console.log("connected successfully to db server");
    }
    catch {
        console.log("connection error");
    }

};
console.log("line 17");
connectToMongodb();

/*{useUnifiedTopology: true}, function(err){
    console.log("connected successfully to db server");
    console.log(client);
    // connect to myproject database
    db = client.db('myproject');
});
*/

// Withdraw
async function withdraw(email, amount) {
    
    const collection = db.collection('users');
    let oldUser = await collection.findOne({email});
    if (oldUser.balance >= amount && amount > 0) {
        let result = await collection.updateOne({email}, {$inc:{balance: -amount}});
        console.log('Withdraw Result: ', result);
        let updatedUser = await collection.findOne({email});
        console.log('Updated User: ', updatedUser);
        return updatedUser;
    }
    else return oldUser;
}

// Deposit
async function deposit(email, amount) {
    const collection = db.collection('users');
    if (amount < 0) {
        let user = await collection.findOne({email});
        console.log('Updated User: ', user);
        return user;
    }
    let result = await collection.updateOne({email}, {$inc:{balance: +amount}});
    console.log('Withdraw Result: ', result);
    let user = await collection.findOne({email});
    console.log('Updated User: ', user);
    return user;
    
}

// create a user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc        = {name, email, password, balance:100};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        })
    })
}

// returns all the users that exist in the users collection
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
        .collection('users')
        .find({})
        .toArray(function(err,docs) {
            err ? reject(err) : resolve(docs);
        });
    })
}


module.exports = {create, all, withdraw, deposit};