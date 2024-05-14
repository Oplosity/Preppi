# Preppi Project README

## Requirements

### Packages
- **body-parser**: Package to parse a request's body
- **express**: Package for running the server
- **pg**: Package for creating a connection between the server and PostgreSQL
- **bcrypt**: Package for hashing and salting passwords, making them securely stored

### Tools
- **PostgreSQL**: Required for running the database
    - You can download it from the internet
    - **Setting up:**
        1. Open pgAdmin4, it will ask for the password you set during installation
        2. Once inside, right-click on 'Databases (1)' and create a new database called 'preppi_db'
        3. Right-click the database, and click on 'Query Tool'
        4. Press the folder icon, then locate and open file 'create_db.sql' that came with the repository
        5. Press the execute script button or press F5
        6. Once it has run, refresh the database by right-clicking it and clicking 'Refresh...'
        7. Check to ensure that a schema called 'preppi_schema' was created
        8. Ensure that there are 3 tables inside the schema: users, scores, and quizzes
        9. You are done!

## Requests

### Post requests | Login, Register, Create Quiz

- **Login**: `http://localhost:3001/users?type=login`
    - This is for logging in to an existing account
    - **Required data in body**: username, password

- **Register**: `http://localhost:3001/users?type=register`
    - This is for creating a new account
    - **Required data in body**: username, password, email

- **Create Quiz**: `http://localhost:3001/quizzes`
    - This is for creating a new quiz
    - **Required data in body**: quiz_name, quiz_desc, questions (example in example/example.json), subject

### Get requests | Get Quizzes, Get Scores

- **Get Quizzes**: `http://localhost:3001/quizzes?subject=searchedsubject`
    - This is for getting the quizzes within a specific subject (e.g., math, biology, etc...)
    - `"searchedsubject"` is the subject that you want to search for, replace it with some subject
    - Returns quiz name, description, questions, and subject
