const bcrypt = require('bcrypt');
const db = require('./dbconnection.js');

    // POST REQUESTS //

// Register
async function userRegister(body) {
    try {
        // Initialize data
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

        // If username or email already exists
        if (existingUser.rows.length > 0) {
            console.log("Registering failed, username or email in use.");
            return { status: 400, data: "Username or email already in use" };
        }

        // Try to insert given data to table
        await db.query(`
            INSERT INTO preppi_schema.users (username, password, email, admin)
            VALUES ($1, $2, $3, $4)
        `, [username, hashedPassword, email, false]);

        console.log("Registering successful.");
        return { status: 201, data: "Registering successful!" };

    } catch (error) {
        console.error("Error during registering:", error);
        return { status: 500, message: "Internal Server Error " + error };
    }
}

// Login
async function userLogin(body) {
    try {
        // Initialize data
        const username = body.username;
        const password = body.password;

        // Check if given data is empty
        if (!username || !password) {
            console.log("Login failed, missing information.")
            return { status: 400, data: "Please enter both username and password." };
        }

        // Get user from database
        const user = await db.query(`
            SELECT username, password, email, admin 
            FROM preppi_schema.users 
            WHERE (username = $1 OR email = $1)
        `, [username]);

        // If user not found
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
        return { status: 500, message: "Internal Server Error " + error };
    }
}

// Create quiz
async function createQuiz(body) {
    try {
        // Initialize data
        quiz_name = body.quiz_name;
        quiz_desc = body.quiz_desc;
        questions = body.questions;
        subject = body.subject;
        username = body.username;
    
        // Ensure all values contain data
        if (!quiz_name || !quiz_desc || !questions || !subject || !username) {
            console.log("Request missing data.");
            return { status: 400, message: "Please ensure that quiz_name, quiz_desc, questions, subject and username contain data!" };
        }
    
        // Check if user is authorized to create quiz
        user = await db.query(`
            SELECT admin 
            FROM preppi_schema.users 
            WHERE (username = $1)
        `, [username]);
    
        // If user not found
        if (user.rows.length === 0) {
            console.log("User not found");
            return { status: 401, message: "User not found" };    
        } else if (user.rows[0].admin !== true) {
            // If user not admin
            console.log("Error: Unauthorized");
            return { status: 401, message: "Unauthorized" };    
        }
            
        // Try putting data into database
        await db.query(`
            INSERT INTO preppi_schema.quizzes (quiz_name, quiz_desc, questions, subject)
            VALUES ($1, $2, $3, $4)
        `, [quiz_name, quiz_desc, questions, subject]);
    
        console.log("Successfully created quiz.");
        return { status: 200, message: "Successfully created quiz!" };

    } catch (error) {
        console.error("Error during login:", error);
        return { status: 500, message: "Internal Server Error " + error };
    }
}

// Add score
async function addScore(body) {
    try {
        // Initialize data
        username = body.username;
        quiz_id = body.quiz_id;
        score = body.score;
        let user_id;
    
        // Ensure that all values contain data
        if (!username || !quiz_id || !score) {
            console.log("Request missing data.");
            return { status: 400, message: "Please ensure that username, quiz_id and score contain data!" };
        }
    
        // Try getting user_id
        user_id = await db.query(`
            SELECT user_id FROM preppi_schema.users
            WHERE username = $1
        `, [username]);
    
        // Check if any username matched
        if (user_id.rows.length === 0) {
            console.error("Invalid username");
            return { status: 400, message: "Please give an existing username!" };
        } else {
            user_id = user_id.rows[0].user_id;
            console.log("Got user id")
        }
    
        // Try adding scores
        await db.query(`
            INSERT INTO preppi_schema.scores (user_id, quiz_id, score)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, quiz_id) DO UPDATE
            SET score = EXCLUDED.score
        `, [user_id, quiz_id, score]);
    
        console.log("Inserted score successfully")
    
        console.log("Successfully added score.");
        return { status: 201, message: "Successfully updated score!" };
    } catch (error) {
        console.error("Error during adding scores:", error);
        return { status: 500, message: "Internal Server Error " + error };
    }
}


    // GET REQUESTS //

// Check if user is admin
async function checkUser(query) {
    try {
        // Initialize data
        const username = query.username;

        if (!username) {
            return { status: 401, data: "Please enter an username!" };
        }
        
        const user = await db.query(`
        SELECT admin 
        FROM preppi_schema.users 
        WHERE (username = $1)`, [username]);


        if (user.rows.length === 0) {
            console.log("Authentication failed, user not found.");
            return { status: 401, data: "Incorrect username!" };
        } 

        console.log("Successfully checked whether user is admin or not.");
        const isAdmin = user.rows[0].admin;
        return { status: 200, data: ''+isAdmin+'' };

    } catch (error) {
        console.error("Error during user auth:", error);
        return { status: 500, message: "Internal Server Error " + error};
    }
}

// Get quizzes
async function getQuizzes(subject, empty) {
    try {
        // Initialize data
        let quizzes;
        let formattedQuizzes;

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
            formattedQuizzes = quizzes.rows.map(row => {
                return {
                    quiz_id: row.quiz_id,
                    quiz_name: row.quiz_name,
                    quiz_desc: row.quiz_desc,
                    subject: row.subject
                };
            });

        } else {
            console.log("Successfully got quizzes. However, none exist.");
            if (!empty) {
                return { status: 200, message: "No quizzes for that subject exist yet!" };
            } else {
                return { status: 200, message: "No quizzes exist yet!" };
            }
        }

        console.log("Successfully got and formatted quizzes");
        return { status: 200, message: formattedQuizzes };

    } catch (error) {
        if (!empty) {
            console.error("Error during getting quizzes for subject " + subject + ':', error);
        } else {
            console.error("Error during getting all quizzes:", error)
        }
        return { status: 500, message: "Internal Server Error " + error };
    }
}

// Get questions
async function getQuestions(query) {
    try {
        // Initialize data
        let id = query.id;

        if (!id) {
            return { status: 401, data: "Please enter an id!" };
        }

        // Ensure given id is integer
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            console.log("Incorrect id.");
            return { status: 400, message: "id can't contain characters!" };
        }


        // Look for questions in a specific quiz
        const questions = await db.query(`
        SELECT questions
        FROM preppi_schema.quizzes 
        WHERE quiz_id = $1`, [id]);

        // Check if any questions for that quiz exist
        if (questions.rows.length > 0) {
            console.log("Successfully got and sent existing questions");
            return { status: 200, message: questions.rows };

        } else { // If quiz contains no questions (Shouldn't happen)
            console.log("Successfully got questions. However, none exist.");
            return { status: 200, message: "No questions for that quiz exist! Either you provided an invalid id, or there was an error when creating questions for that quiz." };
        }

    } catch (error) {
        console.error("Error during getting questions for quiz:", error);
        return { status: 500, message: "Internal Server Error " + error };
    }
}

// Get quiz scores
async function getQuizScores(quiz_id, empty) {
    try {
        // If quiz_id was given
        if (!empty) { 

            // Ensure given id is integer
            const parsedId = parseInt(quiz_id);
            if (isNaN(parsedId)) {
                console.log("Incorrect id.");
                return { status: 400, message: "Invalid id! Please ensure that the id is an integer." };
            }

            // Get scores
            scores = await db.query(`
                SELECT u.username, q.quiz_name, s.score
                FROM preppi_schema.scores s
                JOIN preppi_schema.users u ON s.user_id = u.user_id
                JOIN preppi_schema.quizzes q ON s.quiz_id = q.quiz_id
                WHERE s.quiz_id = $1
            `, [quiz_id]);

        } else { // If no quiz_id was given

            // Get scores
            scores = await db.query(`
                SELECT u.username, q.quiz_name, s.score
                FROM preppi_schema.scores s
                JOIN preppi_schema.users u ON s.user_id = u.user_id
                JOIN preppi_schema.quizzes q ON s.quiz_id = q.quiz_id
            `);
        }

        // If no scores exist
        if (scores.rows.length === 0 && !empty) {
            console.log("No scores exist");
            return { status: 500, message: "No scores associated with given quiz" };
        } else if (scores.rows.length === 0 && empty) {
            console.log("No scores exist");
            return { status: 500, message: "No scores exist at all!" };
        }

        console.log("Successfully got scores!");
        return { status: 200, message: scores.rows };

    } catch (error) {
        console.error("Error during getting quiz scores:", error);
        return { status: 500, message: "Internal Server Error " + error };
    }
}

// Get user scores
async function getUserScores(query) {
    try {
        // Initialize data
        let username = query.username;

        // If username doesn't exist
        if (!username) {
            console.error("Username not given");
            return { status: 400, message: "No username specified" };
        }
    
        // Get user scores
        scores = await db.query(`
            SELECT q.quiz_name, s.score
            FROM preppi_schema.scores s
            JOIN preppi_schema.quizzes q ON s.quiz_id = q.quiz_id
            JOIN preppi_schema.users u ON s.user_id = u.user_id
            WHERE u.username = $1
        `, [username]);

        // If user has no scores yet
        if (scores.rows.length === 0) {
            console.log("User has no saved scores");
            return { status: 200, message: "User has no scores" };
        }
    
        console.log("Successfully got scores!");
        return { status: 200, message: scores.rows };

    } catch (error) {
        console.error("Error during getting user scores:", error);
        return { status: 500, message: "Internal Server Error " + error };
    }
}

    // PUT REQUESTS //

// Edit quiz
async function editQuiz(body) {
    try {
        // Initialize data
        let username = body.username;
        let quiz_id = body.quiz_id;
        let quiz_name = body.quiz_name;
        let quiz_desc = body.quiz_desc;
        let subject = body.subject;
        let questions = body.questions;
    
        // Ensure all values contain data
        if (!username || !quiz_id || !quiz_name || !quiz_desc || !subject) {
            console.log("Request missing data.");
            return { status: 400, message: "Please ensure that quiz_id, quiz_name, quiz_desc, subject and username contain data!" };
        }
    
        // Check if user is authorized to create quiz
        user = await db.query(`
            SELECT admin 
            FROM preppi_schema.users 
            WHERE (username = $1)
        `, [username]);
    
        // If user not found
        if (user.rows.length === 0) {
            console.log("User not found");
            return { status: 401, message: "User not found" };    
        } else if (user.rows[0].admin !== true) {
            // If user not admin
            console.log("Error: Unauthorized");
            return { status: 401, message: "Unauthorized" };    
        }

        // Edit quiz
        // Try putting new data into quiz
        if (!questions) {
            quizzes = await db.query(`
            UPDATE preppi_schema.quizzes 
            SET quiz_name = $2,
                quiz_desc = $3,
                subject = $4
            WHERE quiz_id = $1`, [quiz_id, quiz_name, quiz_desc, subject]);

        } else {
            quizzes = await db.query(`
            UPDATE preppi_schema.quizzes 
            SET quiz_name = $2,
                quiz_desc = $3,
                questions = $4,
                subject = $5
            WHERE quiz_id = $1`, [quiz_id, quiz_name, quiz_desc, questions, subject]);
        }

        console.log("Successfully edited quiz!");
        return { status: 201, message: "Successfully edited quiz!" };

    } catch (error) {
        console.error("Error during editing quiz");
        return { status: 500, message: "Internal Server Error " + error };
    }
}

    // DELETE REQUESTS //

// Delete quiz
async function deleteQuiz(body) {
    try {
        // Initialize data
        username = body.username;
        quiz_id = body.quiz_id;

        // Ensure all values contain data
        if (!username || !quiz_id) {
            console.log("Request missing data.");
            return { status: 400, message: "Please ensure that quiz_id, quiz_name, quiz_desc, subject and username contain data!" };
        }
    
        // Check if user is authorized to create quiz
        user = await db.query(`
            SELECT admin 
            FROM preppi_schema.users 
            WHERE (username = $1)
        `, [username]);
    
        // If user not found
        if (user.rows.length === 0) {
            console.log("User not found");
            return { status: 401, message: "User not found" };    
        } else if (user.rows[0].admin !== true) {
            // If user not admin
            console.log("Error: Unauthorized");
            return { status: 401, message: "Unauthorized" };    
        }

        // Delete quiz
        // Try deleting quiz
        await db.query(`
        DELETE FROM preppi_schema.quizzes
        WHERE quiz_id = $1`, [quiz_id]);

        console.log("Successfully deleted quiz!");
        return { status: 200, message: "Successfully deleted quiz!" };

    } catch (error) {
        console.error("Error during editing quiz");
        return { status: 500, message: "Internal Server Error " + error };
    }
}



module.exports = { userLogin, userRegister, createQuiz, getQuizzes, getQuestions, checkUser, editQuiz, deleteQuiz, addScore, getQuizScores, getUserScores };