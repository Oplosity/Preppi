const { userLogin, userRegister } = require('./functions.js');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001

// User login/register
app.post('/users', (req, res) => {
    const type = req.query.type;
    let response;

    if (type === "login") {
        response = userLogin(req.body);

    } else if (type === "register") {
        response = userRegister(req.body);

    } else {
        response = type + " is not a recognized value for query 'users'! Did you mean login/register?";
    }
    
    res.send(response);
})

// quizzes
app.get('/quizzes', (req, res) => {
    const subject = req.query.subject;
    let subjects = ['math', 'biology', 'english', 'physics', 'chemistry', 'history', 'geography', 'computer science', 'information technology', 'statistics', 'economics', 'accounting', 'business studies', 'foreign languages', 'literature', 'philosophy', 'psychology', 'sociology', 'anthropology', 'linguistics', 'philosophy of science', 'epistemology', 'logic'];
    let response;

    if (subjects.includes(subject)) {
        response = 'you chose ' + subject;
    } else {
        response = subject + ' is not an accepted subject type! List of accepted subject types: ' + subjects;
    }

    res.send(response);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})