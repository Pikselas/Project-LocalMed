const express = require('express');
const app = express();
const mongodb = require('./MongoDB').mongodb;

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pss = "oDM7I8dTzLR2yRlw"
const DB_URL = `mongodb+srv://aritramaji14:${pss}@petstorecluster.uqh8nns.mongodb.net/?retryWrites=true&w=majority`

app.post('/signup', (req, res) => {
    const mongo = new mongodb(DB_URL,'localmed');
    mongo.Ready.then(() => {
        mongo.insertOne('users', req.body);
        
        res.redirect('/Home Page/index2.html');

    });
});

app.post('/login', (req, res) => {
    const mongo = new mongodb(DB_URL,'localmed');
    mongo.Ready.then(() => {
        mongo.find('users', req.body).then((data) => {
            if(data.length > 0){
                res.redirect('/Home Page/index2.html');
            }else{
                res.send({success:false});
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
    });