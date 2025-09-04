const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/vendors', express.static(__dirname + '/vendors'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pac_lms_db'
});

db.connect(err => {
    if (err) throw err;
    console.log("successfully connected");
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/admin/dashboard', function(req, res) {
    res.render('admin', {render: {page: 'dashboard'}});
});

app.get('/admin/credentials', function(req, res) {
    res.render('admin', {render: {page: 'credentials'}});
});

app.post('/login', function(req, res) {
    db.query('INSERT INTO ', (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

app.listen(port, () => {console.log(`http://localhost:${port}`)});