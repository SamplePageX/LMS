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

let validatedEmail;
// Reset Password Page
app.get('/reset-password', function (req, res) {
    res.render('reset-password', { 'data': validatedEmail });
});

// Admin Dashboard
app.get('/admin/dashboard', function (req, res) {
    res.render('admin', { render: { page: 'dashboard' } });
});

// Admin User Management
app.get('/admin/user-management/users', function (req, res) {
    res.render('admin', { render: { page: 'users' } });
});

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

    const myQuery = `SELECT * FROM users WHERE email = '${validEmail}'`;

    db.query(myQuery, function (err, row) {
        if (row.length > 0) {
            const hash = row[0].password;

            const checkPassword = bcrypt.compareSync(validPassword, hash);

            if (checkPassword) {
                if (row[0].role_id === 1) {
                    res.send({ 'redirect': '/faculty/dashboard' });
                } else if (row[0].role_id === 2) {
                    res.send({ 'redirect': '/student/dashboard' });
                } else {
                    res.send({ 'redirect': '/admin/dashboard' });
                }
            } else {
                res.send({ 'error': 'Invalid Credentials' });
            }
        } else {
            res.send({ 'error': 'Invalid Credentials' });
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

    const myQuery = `SELECT * FROM users WHERE email = '${validEmail}'`;

    db.query(myQuery, function (err, row) {
        if (row.length > 0) {
            validatedEmail = validEmail;
            res.send({ 'redirect': 'reset-password' });
        } else {
            res.send({ 'error': 'Invalid Credentials' });
        }
    });
})

app.patch('/reset-password', function (req, res) {

    const validEmail = req.body.email;
    const validPassword = req.body.password;

    const hash = bcrypt.hashSync(validPassword, 10);

    const myQuery = `UPDATE users SET password = '${hash}' WHERE email = '${validEmail}'`;

    db.query(myQuery, function (err, rows) {
        if (err) throw err;
        res.send({ 'redirect': '/' });
    });
})

// Remove User Account
app.delete('/remove-user', function (req, res) {

    const userId = req.body.user_id;

    const myQuery = `DELETE FROM users WHERE id = ${userId}`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;

        res.send({ 'success': 'Successfully Deleted' });
    });

})

// Get All Users
app.get('/users', function (req, res) {

    const myQuery = `SELECT * FROM users`;

    db.query(myQuery, function (err, rows) {
        if (rows.length > 0) {
            res.send({ 'data': rows })
        }
    });
});

// faculty (create)
app.post('/faculty', function (req, res) {

    const fullname = req.body.fullname;
    const email = req.body.email;
    const department = req.body.department;
    const password = req.body.password;

    const hash = bcrypt.hashSync(password, 10)

    const myQuery = `INSERT INTO faculty 
        (fullname, email, department, password) VALUES ("${fullname}", "${email}", "${department}", "${hash}")`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;
        console.log("result from database: ", result);
    });

    res.send({ 'redirect': '/' });
})

// faculty (read)
app.get('/facultyTable', function (req, res) {

    const myQuery = `SELECT * FROM faculty`;

    db.query(myQuery, function (err, rows) {
        if (rows.length > 0) {
            res.send({ 'data': rows });
        }
    });
})

// faculty (update)
app.patch('/updateFaculty', function (req, res) {

    const id = req.body.id;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const department = req.body.department;

    const myQuery = `UPDATE faculty SET fullname = '${fullname}', email = '${email}', department = '${department}' WHERE user_id = '${id}'`;

    db.query(myQuery, function (err, rows) {
        if (err) throw err;
        res.send({ 'redirect': '/admin/user-management/faculty' });
    });
})

// faculty (reset)
app.patch('/resetPasswordFaculty', function (req, res) {

    const id = req.body.id;
    const password = req.body.password;

    const hash = bcrypt.hashSync(password, 10)
    const myQuery = `UPDATE faculty SET password = '${hash}' WHERE user_id = '${id}'`;

    db.query(myQuery, function (err, rows) {
        if (err) throw err;
        res.send({ 'redirect': '/admin/user-management/faculty' });
    });
})

// faculty (delete)
app.delete('/deleteFaculty', function (req, res) {

    const userId = req.body.id;

    const myQuery = `DELETE FROM faculty WHERE user_id = ${userId}`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;

        res.send({ 'success': 'Successfully Deleted' });
    });

})

// Enrollment Section
// enrollment (read)
app.get('/get-enrollment', function (req, res) {

    const myQuery = `SELECT * FROM enrollment`;

    db.query(myQuery, function (err, rows) {
        if (rows) {
            if (rows.length > 0) {
                res.send({ 'enrollment': rows });
            } else {
                res.send({ 'enrollment': 'No records' });
            }
        } else {
            res.send({ 'enrollment': 'No records' });
        }
    });
})

// enrollment (create)
app.post('/create-enrollment', function (req, res) {

    const course = req.body.course;
    const student = req.body.student;
    const date = req.body.date;

    const myQuery = `INSERT INTO enrollment 
        (course, student, date_of_enrollment) VALUES ("${course}", "${student}", "${date}")`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;
        console.log("result from database: ", result);
    });

    res.send({ 'success': 'Successfully Created' });
})

// enrollment (delete)
app.delete('/remove-enrollment', function (req, res) {

    const enrollmentId = req.body.id;

    const myQuery = `DELETE FROM enrollment WHERE id = ${enrollmentId}`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;

        res.send({ 'success': 'Successfully Deleted' });
    });

})

// enrollment (update)
app.patch('/update-enrollment', function (req, res) {

    const id = req.body.enrollmentId;
    const course = req.body.course;
    const student = req.body.student;
    const date = req.body.date;

    const myQuery = `UPDATE enrollment SET course = '${course}', student = '${student}', date_of_enrollment = '${date}' WHERE id = '${id}'`;

    db.query(myQuery, function (err, rows) {
        if (err) throw err;
        res.send({ 'success': 'Successfully Updated' });
    });
})

// Announcement Section
// announcement (create)
app.post('/create-announcement', function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    const myQuery = `INSERT INTO announcements (title, content, author) VALUES ('${title}', '${content}', '${author}')`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;
        console.log("result from database: ", result);
    });

    res.send({'success': 'Successfully Created!'});
})

// annoucement (read)
app.get('/get-annoucement', function (req, res) {

    const myQuery = `SELECT * FROM announcements`;

    db.query(myQuery, function (err, rows) {
        if (rows) {
            if (rows.length > 0) {
                res.send({ 'announcements': rows });
            } else {
                res.send({ 'announcements': 'No records' });
            }
        } else {
            res.send({ 'announcements': 'No records' });
        }
    });
})

// announcement (update)
app.patch('/update-announcement', function (req, res) {

    const id = req.body.announcementId;
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;

    const myQuery = `UPDATE announcements SET title = '${title}', content = '${content}', author = '${author}' WHERE id = ${id}`;

    db.query(myQuery, function (err, rows) {
        if (err) throw err;
        res.send({ 'success': 'Successfully Updated' });
    });
})

// announcement (delete)
app.delete('/delete-announcement', function (req, res) {

    const annoucementId = req.body.id;

    const myQuery = `DELETE FROM announcements WHERE id = ${annoucementId}`;

    db.query(myQuery, function (err, result) {
        if (err) throw err;

        res.send({ 'success': 'Successfully Deleted' });
    });

})

// <<<<<<<<<<<<<<<<<<

app.listen(port, () => { console.log(`http://localhost:${port}`) });