const { userLogin, userRegister, createQuiz, getQuizzes, getQuestions, checkUser, editQuiz, deleteQuiz, addScore, getQuizScores, getUserScores } = require('./functions.js');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// For parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

    // POST REQUESTS //

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

// Create a new quiz
app.post('/quizzes', async (req, res) => {
    console.log("Received request to create quiz")
    const result = await createQuiz(req.body);
    res.status(result.status).send(result.data || result.message);
});

// Add scores
app.post('/scores', async (req, res) => {
    console.log("Received request to add score")
    const result = await addScore(req.body);
    res.status(result.status).send(result.data || result.message);
});

    // GET REQUESTS //

// Authenticate user (admin or not)
app.get('/auth', async (req, res) => {
    console.log("Received request to check whether " + req.query.username + " is an admin or not");

    if (req.body.username !== "") {
        const result = await checkUser(req.query);
        res.status(result.status).send(result.data || result.message);
    } else {
        res.status(401).send("Please enter username!");
    }
});

// Get all quizzes for either a specific subject, or in general
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

    if (subject === undefined) {
        // Get all questions
        console.log("Received request to get quizzes.")
        const result = await getQuizzes(subject, true);
        res.status(result.status).send(result.data || result.message);

    } else if (subjects.includes(subject)) {
        // Get questions from a specific subject
        console.log("Received request to get quizzes.")
        const result = await getQuizzes(subject, false);
        res.status(result.status).send(result.data || result.message);

    } else {
        res.status(400).send(subject + " is not a recognized value for query 'subject'! List of accepted values: " + subjects);
    }
});

// Get questions for a quiz
app.get('/quizzes/questions', async (req, res) => {
    const id = req.query.quiz_id;

    if (id !== "") {
        console.log("Received request to get questions.")
        const result = await getQuestions(id);
        res.status(result.status).send(result.data || result.message);
    } else {
        console.log("No id specified for request to get questions.")
        res.status(400).send("Invalid id! Please ensure that the id is an integer.");  
    }
});

// Get quiz scores
app.get('/scores/quizzes', async (req, res) => {
    const quiz_id = req.query.quiz_id;

    if (quiz_id  === undefined ) {
        console.log("Received request to get scores of all quizzes.")
        const result = await getQuizScores(quiz_id, true);
        res.status(result.status).send(result.data || result.message);    

    } else {
        console.log("Received request to get scores for a specific quiz.")
        const result = await getQuizScores(quiz_id, false);
        res.status(result.status).send(result.data || result.message);
    }
});

// Get user scores
app.get('/scores/users', async (req, res) => {
    const username = req.query.username;

    if (username === undefined ) {
        console.log("Missing username.")
        res.status(400).send("Request is missing username!");    

    } else {
        console.log("Received request to get user scores.")
        const result = await getUserScores(username);
        res.status(result.status).send(result.data || result.message);
    }
});


    // PUT REQUESTS //

// Edit quiz
app.put('/quizzes', async (req, res) => {
    console.log("Received request to edit quiz.")
        const result = await editQuiz(req.body);
        res.status(result.status).send(result.data || result.message);
});

    // DELETE REQUESTS //

// Delete quiz
app.delete('/quizzes', async (req, res) => {
    console.log("Received request to delete quiz.")
        const result = await deleteQuiz(req.body);
        res.status(result.status).send(result.data || result.message);
});

// Listen for requests on port 3001
app.listen(3001, () => {
    console.log(`App listening on port 3001`)
})