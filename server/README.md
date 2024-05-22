# Preppi Project README

## Requirements

### Packages
- **body-parser**: Package to parse a request's body
- **express**: Package for running the server
- **pg**: Package for creating a connection between the server and PostgreSQL
- **bcrypt**: Package for hashing and salting passwords, making them securely stored
- **dotenv**: Package for locally storing DB connection information

### Tools
- **PostgreSQL**: Required for running the database
    - You can download it from the internet
    - **Setting up:**
        - Open pgAdmin4, it will ask for the password you set during installation
        - Once inside, right-click on 'Databases (1)' and create a new database called 'preppi_db'
        - Right-click the database, and click on 'Query Tool'
        - Press the folder icon, then locate and open file 'create_db.sql' that came with the repository
        - Press the execute script button or press F5
        - Once it has run, refresh the database by right-clicking it and clicking 'Refresh...'
        - Check to ensure that a schema called 'preppi_schema' was created
        - Ensure that there are 3 tables inside the schema: users, scores, and quizzes
        - You are done!

## Requests

### Post requests | Login, Register, Create Quiz, Add score, Logout

- **Login**: `http://localhost:3001/users?type=login`
    - This is for logging in to an existing account
    - **Required data in body**: username (string), password (string)

- **Register**: `http://localhost:3001/users?type=register`
    - This is for creating a new account
    - **Required data in body**: username (string), password (string), email (string)

- **Logout**: `http://localhost:3001/logout`
    - This is for deleting jwt from cookies

- **Create Quiz**: `http://localhost:3001/quizzes`
    - This is for creating a new quiz
    - **Required data in body**: quiz_name (string), quiz_desc (string), questions (JSONB) (example in example/example.json), subject (string), username (string)
    - `'username'` is for ensuring that only authorized users can create quizzes

- **Add Score**: `http://localhost:3001/scores`
    - This is for adding scores users get from quizzes
    - **Required data in body**: username (string), quiz_id (int)

### Get requests | Get Quizzes, Get Questions, Authenticate user, Get scores, Get Specific User's Scores

- **Get Quizzes**: `http://localhost:3001/quizzes?subject=searchedsubject`
    - This is for getting the quizzes within a specific subject (e.g., math, biology, etc...)
    - `'searchedsubject'` is the subject that you want to search for, replace it with some subject
    - if `'searchedsubject'` is not defined, returns all quizzes instead
    - Returns quiz id (int), name (string), description (string) and subject (string)

- **Get Questions**: `http://localhost:3001/quizzes/questions?quiz_id=quizid`
    - This is for getting the questions in a specific quiz
    - `'quizid'` is the id of the quiz you want to get the questions to
    - Returns questions (JSONB)

- **Authenticate User**: `http://localhost:3001/auth?username=username`
    - This is for checking whether the user is an admin or not
    - `'username'` is the user to be checked
    - Returns either true or false depending on if the user is an admin or not

- **Get Quiz Scores**: `http://localhost:3001/scores/quizzes?quiz_id=quiz_id`
    - This is for getting scores of quizzes
    - `'quiz_id'` is the quiz whose scores we want
    - if `'quiz_id'` is not defined, returns all scores from all quizzes instead
    - Returns username (string), quiz_name (string) and score (int)

- **Get A Specific User's Scores**: `http://localhost:3001/scores/users?username=username`
    - This is for getting scores of users
    - `'username'` is the user whose scores we want
    - Returns quiz_name (string) and score (int)

### Put requests | Edit Quiz

- **Edit Quiz**: `http://localhost:3001/quizzes`
    - This is for editing quizzes
    - **Required data in body**: quiz_id (int), quiz_name (string), quiz_desc (string), questions (JSONB), subject (string), username (string)
    - If `'questions'` is left empty, it will keep the old questions. This is only the case for questions, so don't leave other things empty
    - Note that declaring questions is still required. If the body doesn't contain "questions", it will return an error
    - `'username'` is for ensuring that only authorized users can edit quizzes

### Delete requests | Delete Quiz

- **Delete Quiz**: `http://localhost:3001/quizzes`
    - This is for deleting quizzes
    - **Required data in body**: quiz_id (int), username (string)
    - `'username'` is for ensuring that only authorized users can delete quizzes