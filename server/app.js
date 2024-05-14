const { userLogin, userRegister } = require('./functions.js');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// For parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User login/register
app.post('/users', async (req, res) => {
    const type = req.query.type;
    let response;

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

// Listen for requests on port 3001
app.listen(3001, () => {
    console.log(`App listening on port 3001`)
})