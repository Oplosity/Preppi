const { userLogin, userRegister, getQuizzes } = require('./functions.js');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// For parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User login/register
app.post('/users', async (req, res) => {
    const type = req.query.type;

    if (type === "register") {
        console.log("Received register request.")
        const result = await userRegister(req.body);
        res.status(result.status).send(result.data || result.message);
    } else if (type === "login") {
        console.log("Received login request.")
        const result = await userLogin(req.body);
        res.status(result.status).send(result.data || result.message);
    } else {
        res.status(400).send(type + " is not a recognized value for query 'users'! Did you mean register/login?");
    }
});

// Get all quizzes for a specific subject
app.get('/quizzes', async (req, res) => {
    const subject = req.query.subject;
    const subjects = [
        "Mathematics",
        "English",
        "Science",
        "History",
        "Geography",
        "French",
        "Spanish",
        "German",
        "Italian",
        "Computer Science",
        "Art",
        "Music",
        "Physical Education",
        "Business Studies",
        "Economics",
        "Biology",
        "Chemistry",
        "Physics",
        "Psychology"
    ];

    if (subjects.includes(subject)) {
        console.log("Received request to get quizzes.")
        const result = await getQuizzes(subject);
        res.status(result.status).send(result.data || result.message);

    } else {
        res.status(400).send(subject + " is not a recognized value for query 'subject'! List of accepted values: " + subjects);
    }
});

// Listen for requests on port 3001
app.listen(3001, () => {
    console.log(`App listening on port 3001`)
})