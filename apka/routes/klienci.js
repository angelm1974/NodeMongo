var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const cstr = 'mongodb+srv://testowy:Bydgoszcz007@mario-ew0vt.mongodb.net/mojabaza?retryWrites=true&w=majority';

MongoClient.connect(cstr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Połączono z bazą danych!!!');

        const db = client.db('mojabaza');
        const quotesCollection = db.collection('Mario');

        var dane;

        /* GET klienci page. */
        router.get('/', function (req, res, next) {

            quotesCollection.find().toArray()
                .then(results => {
                    console.log(results);
                    res.render('klienci', { title: 'Baza klientów', "listaKlientow": results });

                })


        })


        /* POST klienci page */
        router.post('/wstaw', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/klienci');
                    dane = req.body;
                    console.log(dane);
                })
                .catch(error => console.error(error));
        })

    });

module.exports = router;