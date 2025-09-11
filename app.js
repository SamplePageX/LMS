const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = 8080;

app.use(express.json());
// app.use(cors());

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/vendors', express.static(__dirname + '/vendors'));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pac_lms_db'
});

// To check if the connection was success
db.connect(err => {
    if (err) throw err;
    console.log("successfully connected");
});

// ROUTES
// Login page
app.get('/', function (req, res) {
    res.render('index');
});

// Register page
app.get('/register', function (req, res) {
    res.render('register');
});

// Forgot password page
app.get('/forgot-password', function (req, res) {
    res.render('forgot-password');
});

// Reset Password Page
app.get('/reset-password', function (req, res) {
    res.render('reset-password');
});

// Admin Dashboard
app.get('/admin/dashboard', function (req, res) {
    res.render('admin', { render: { page: 'dashboard' } });
});

// Admin User Management
app.get('/admin/user-management/faculties', function (req, res) {
    res.render('admin', { render: { page: 'faculty' } });
});

app.get('/admin/user-management/students', function (req, res) {
    res.render('admin', { render: { page: 'students' } });
});

app.get('/admin/user-management/enrollment', function (req, res) {
    res.render('admin', { render: { page: 'enrollment' } });
});

// Admin Course Management
app.get('/admin/course-management', function (req, res) {
    res.render('admin', { render: { page: 'course-management' } });
});

// Faculty Dashboard
app.get('/faculty/dashboard', function (req, res) {
    res.render('faculty', { render: { page: 'dashboard' } });
});

// Faculty Course
app.get('/faculty/course/modules', function (req, res) {
    res.render('faculty', { render: { page: 'modules' } });
});

app.get('/faculty/course/assignments', function (req, res) {
    res.render('faculty', { render: { page: 'assignments' } });
});

app.get('/faculty/course/tests', function (req, res) {
    res.render('faculty', { render: { page: 'tests' } });
});

app.get('/faculty/course/discussions', function (req, res) {
    res.render('faculty', { render: { page: 'discussions' } });
});

app.get('/faculty/communication/announcements', function (req, res) {
    res.render('faculty', { render: { page: 'announcements' } });
});

// New routes here
// >>>>>>>>>>>>>>>>>>



// <<<<<<<<<<<<<<<<<<

// API
// >>>>>>>>>>>>>>>>>>

// Login Page
app.post('/login', function (req, res) {

    const validEmail = req.body.email;
    const validPassword = req.body.password;

    const myQuery = `SELECT * FROM users`;

    db.query(myQuery, function (err, rows) {
        if (rows.length > 0) {
            rows.forEach(row => {
                if (validEmail == row.email) {
                    const hash = row.password;

                    const checkPassword = bcrypt.compareSync(validPassword, hash);

                    if (checkPassword) {
                        if (row.role_id === 1) {
                            res.send({ 'redirect': '/faculty/dashboard' });
                        } else {
                            res.send({ 'redirect': '/student/dashboard' });
                        }
                    } else {
                        res.send({ 'error': 'Invalid Credentials' });
                    }
                } else {
                    res.send({ 'error': 'Invalid Credentials' });
                }
            });
        }
    });
})

// Register Page
app.post('/register', function (req, res) {

    const validName = req.body.fullname;
    const validSchoolId = req.body.school_id;
    const validEmail = req.body.email;
    const validPassword = req.body.password;

    const hash = bcrypt.hashSync(validPassword, 10)

    const myQuery = `INSERT INTO users 
        (name, school_id, email, password, role_id) VALUES ("${validName}", "${validSchoolId}", "${validEmail}", "${hash}", 2)`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;
        console.log("result from database: ", result);
    });

    res.send({ 'redirect': '/' });
})

// Reset Password
app.post('/forgot-password', function (req, res) {

    const validEmail = req.body.email;

    const myQuery = `SELECT * FROM users`;

    db.query(myQuery, function (err, rows) {
        if (rows.length > 0) {
            rows.forEach(row => {
                if (validEmail == row.email) {
                    res.send({'redirect': 'reset-password'})
                } else {
                    res.send({ 'error': 'Invalid Credentials' });
                }
            });
        }
    });
})

// faculty
app.post('/faculty', function (req, res) {

    const fullname = req.body.fullname;
    const email = req.body.email;
    const department = req.body.department;
    const password = req.body.password;

    const hash = bcrypt.hashSync(password, 10)

    const myQuery = `INSERT INTO faculty 
        (fullname, email, department, password) VALUES ("${fullname}", "${email}", "${department}", "${password}")`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;
        console.log("result from database: ", result);
    });

    res.send({ 'redirect': '/' });
})

// faculty table
app.get('/facultyTable', function (req, res) {

    const myQuery = `SELECT * FROM faculty`;

    db.query(myQuery, function (err, rows){
        if (rows.length > 0) {
            res.send({ 'data': rows });
        }
    });
})
// <<<<<<<<<<<<<<<<<<

app.listen(port, () => { console.log(`http://localhost:${port}`) });