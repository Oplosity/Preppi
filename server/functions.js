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
            await db.query(`
            INSERT INTO preppi_schema.users (username, password, email, admin)
            VALUES ($1, $2, $3, $4)
        `, [username, hashedPassword, email, false]);

        } catch (e) {
            console.error("Error inserting data into database:", error);
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

async function createQuiz(body) {
    quiz_name = body.quiz_name;
    quiz_desc = body.quiz_desc;
    questions = body.questions;
    subject = body.subject;

    // Ensure that all required data is received
    if (quiz_name !== undefined && quiz_desc !== undefined && questions !== undefined && subject !== undefined) {
        
        // Try putting data into database
        try {
            await db.query(`
            INSERT INTO preppi_schema.quizzes (quiz_name, quiz_desc, questions, subject)
            VALUES ($1, $2, $3, $4)
        `, [quiz_name, quiz_desc, questions, subject]);

        } catch (error) {
            console.log("Error inserting data to database:", error);
            return { status: 500, message: "Server failed to connect to database" };
        }

        console.log("Successfully created quiz.");
        return { status: 200, message: "Successfully created quiz!" };

    } else {
        console.log("Request to create quiz was missing info.");
        return { status: 400, message: "Please ensure that quiz_name, quiz_desc, questions and subject contain data!" };
    }
}

async function getQuizzes(subject, empty) {
    let quizzes;
    try {
        if (!empty) {
        // Look for quizzes with the specified subject
        quizzes = await db.query(`
        SELECT quiz_id, quiz_name, quiz_desc, subject
        FROM preppi_schema.quizzes 
        WHERE subject = $1`, [subject]);
        } else {
        // Get all quizzes
        quizzes = await db.query(`
        SELECT quiz_id, quiz_name, quiz_desc, subject
        FROM preppi_schema.quizzes`);
        }


        // Check if any quizzes exist
        if (quizzes.rows.length > 0) {
            console.log("Successfully got quizzes.");
            // Format quizzes
            const formattedQuizzes = quizzes.rows.map(row => {
                try {
                    // Return the quizzes with their id
                    return {
                        quiz_id: row.id,
                        quiz_name: row.quiz_name,
                        quiz_desc: row.quiz_desc,
                        subject: row.subject
                    };
                } catch (error) {
                    console.error("Error parsing JSON for quiz:", row.quiz_name, error);
                    return null;
                }
            });

            console.log("Successfully got and formatted quizzes");
            return { status: 200, message: formattedQuizzes };

        } else {
            console.log("Successfully got quizzes. However, none exist.");
            if (!empty) {
                return { status: 200, message: "No quizzes for that subject exist yet!" };
            } else {
                return { status: 200, message: "No quizzes exist yet!" };
            }
        }

    } catch (error) {
        if (!empty) {
            console.error("Error during getting quizzes for subject " + subject + ':', error);
        } else {
            console.error("Error during getting all quizzes:", error)
        }
        return { status: 500, message: "Internal Server Error" };
    }
}

async function getQuestions(id) {
    try {
        // Look for questions in a specific quiz
        const questions = await db.query(`
        SELECT questions
        FROM preppi_schema.quizzes 
        WHERE quiz_id = $1`, [id]);

        // Check if any questions for that quiz exist
        if (questions.rows.length > 0) {
            console.log("Successfully got and sent existing questions");
            return { status: 200, message: questions.rows };

        } else {
            console.log("Successfully got questions. However, none exist.");
            return { status: 200, message: "No questions for that quiz exist! Either you provided an invalid id, or there was an error when creating questions for that quiz." };
        }

    } catch (error) {
        console.error("Error during getting questions for quiz:", error);
        return { status: 500, message: "Internal Server Error" };
    }
}

module.exports = { userLogin, userRegister, createQuiz, getQuizzes, getQuestions };