const { userLogin, userRegister, createQuiz, getQuizzes, getQuestions, checkUser, editQuiz, deleteQuiz, addScore, getQuizScores, getUserScores, getQuiz, checkAuthentication } = require('./functions.js');
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express()
const cors = require('cors')

require('dotenv').config();

// For parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// cors thing
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

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
        if(result.token){
          console.log(result.token)
          res.cookie('jwt', result.token, {
            httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not accessible via JavaScript
            secure: false, // process.env.NODE_ENV === 'production'
            maxAge: 20 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (20 hours in this case)
            sameSite: 'lax', // 'string' will prevent the browser from sending this cookie along with cross-site requests
          });
        }

        res.status(result.status).send(result.data || result.message);

    } else {
        res.status(400).send(type + " is not a recognized value for query 'users'! Did you mean register/login?");
    }
});

// Logout
app.post('/logout', async (req, res) => {
    try {
        res.status(200).clearCookie("jwt");
    } catch (error) {
        console.error('Error deleting cookie:', error);
        res.status(500).send('Internal Server Error');

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

// Check user authentication 
app.post('/checkAuthentication', async (req, res) => {
  console.log("Received authentication check request");
  const result = await checkAuthentication(req);
  res.status(result.status).send(result.data || result.message);
});

// Log user out (basically, remove a cookie called "jwt")
app.post('/logout', async (req, res) => {
  console.log("Received logout request");
  try{
    res.clearCookie("jwt");
    res.status(200).send("success");
  }catch(e){
    res.status(500).send("Internal Server Error: "+e);
  }
});

    // GET REQUESTS //

// Authenticate user (admin or not)
app.get('/auth', async (req, res) => {
    console.log("Received request to check whether " + req.query.username + " is an admin or not");
    const result = await checkUser(req.query);
    res.status(result.status).send(result.data || result.message);
});

// Get all quizzes for either a specific subject, or in general
app.get('/quizzes', async (req, res) => {
    const subject = req.query.subject;
    const subjects = [
        "Mathematics",
        "Biology",
        "Chemistry",
        "History",
        "Physics",
        "Geography",
        "ComputerScience",
        "Literature",
        "Economics",
        "Art",
        "Music",
        "Philosophy",
        "Psychology",
        "Sociology",
        "PoliticalScience",
        "BusinessStudies",
        "EnvironmentalScience",
        "HealthEducation",
        "ForeignLanguages"
    ];

    if (!subject) {
        // Get all quizzes
        console.log("Received request to get all quizzes.")
        const result = await getQuizzes(subject, true);
        res.status(result.status).send(result.data || result.message);

    } else if (subjects.includes(subject)) {
        // Get quizzes from a specific subject
        console.log("Received request to get a specific subjects quizzes.")
        const result = await getQuizzes(subject, false);
        res.status(result.status).send(result.data || result.message);

    } else {
        res.status(400).send(subject + " is not a recognized value for query 'subject'! List of accepted values: " + subjects);
    }
});

// Get a specific quiz
app.get('/quiz', async (req, res) => {
    console.log("Received request a specific quiz.")
    const result = await getQuiz(req.query);
    res.status(result.status).send(result.data || result.message);
});

// Get questions for a quiz
app.get('/quizzes/questions', async (req, res) => {
    console.log("Received request to get questions.")
    const result = await getQuestions(req.query);
    res.status(result.status).send(result.data || result.message);
});

// Get quiz scores
app.get('/scores/quizzes', async (req, res) => {
    const quiz_id = req.query.quiz_id;

    if (!quiz_id) {
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
    console.log("Received request to get user scores.")
    const result = await getUserScores(req.query);
    res.status(result.status).send(result.data || result.message);
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
    console.log(`App listening on port `+ 3001)
})