const express = require('express')
const app = express()
const port = 3001

// User login
app.post('/users', (req, res) => {
    const type = req.query.type;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    let response;

    if (type === "login") {
        // Function to handle login

    } else if (type === "register") {
        // Function to handle register

    } else {
        response = type + " is not a recognized parameter! Did you mean login/register?";
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