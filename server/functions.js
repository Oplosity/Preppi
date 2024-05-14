const bcrypt = require('bcrypt');
const db = require('./dbconnection.js');

async function userRegister(body) {
    try {
        // Initialize data
        let result;
        const email = body.email;
        const username = body.username;
        const password = body.password;

        // Check if given data is empty
        if (!username || !password || !email) {
            console.log("Registering failed, missing information.")
            return { status: 400, data: "Please enter both username, password and email." };
        }

        // Hash and salt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if username or email already exists
        const existingUser = await db.query(`
            SELECT username, email FROM preppi_schema.users
            WHERE username = $1 OR email = $2
        `, [username, email]);

        if (existingUser.rows.length > 0) {
            // Username or email already exists
            console.log("Registering failed, username or email in use.");
            return { status: 400, data: "Username or email already in use" };
        }

        // Try to insert given data to table
        try {
            result = await db.query(`
            INSERT INTO preppi_schema.users (username, password, email, admin)
            VALUES ($1, $2, $3, $4)
        `, [username, hashedPassword, email, false]);

        } catch (e) {
            console.error(e)
            return { status: 500, data: "Server failed to connect to database" };
        }

        console.log("Registering successful.");
        return { status: 201, data: "Registering successful!" };

    } catch (error) {
        console.error("Error during registering:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}

async function userLogin(body) {
    try {
        // Initialize data
        let result;
        const username = body.username;
        const password = body.password;

        // Check if given data is empty
        if (!username || !password) {
            console.log("Login failed, missing information.")
            return { status: 400, data: "Please enter both username and password" };
        }

        // Get user from database
        const user = await db.query(`
            SELECT username, password, email, admin 
            FROM preppi_schema.users 
            WHERE (username = $1 OR email = $1)`, [username]);

        if (user.rows.length === 0) {
            console.log("Login failed, user not found.");
            return { status: 401, data: "Incorrect username or password" };
        }

        // Compare hashed password
        const hashedPassword = user.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        // If passwords matched
        if (passwordMatch) {
            console.log("Login successful.");
            return { status: 200, data: "Login successful!" };
        } else {
            console.log("Login failed, incorrect password.");
            return { status: 401, data: "Incorrect username or password" };
        }

    } catch (error) {
        console.error("Error during login:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}

async function getQuizzes(subject) {
    try {
        // Look for quizzes with the specified subject
        const quizzes = await db.query(`
        SELECT quiz_name, quiz_desc, quizzes, subject
        FROM preppi_schema.users 
        WHERE (subject = $1)`, [subject]);

        if (quizzes.rows > 0) {
            console.log("Successfully got quizzes.");
            return { status: 200, message: quizzes.rows };

        } else {
            console.log("Successfully got quizzes. However, none exist.");
            return { status: 200, message: "No quizzes for that subject exist yet!" };
        }

    } catch (error) {
        console.error("Error during getting quizzes for subject " + subject + ':', error);
        return { status: 500, message: "Internal Server Error" };
    }
} 

module.exports = { userLogin, userRegister, getQuizzes };