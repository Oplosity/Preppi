# Requirements
- Required packages
 - body-parser
  - package to parse a request's body
 - express
  - package for running the server
 - pg
  - package for creating a connnection between the server and postgres
 - bcrypt
  - package for hashing and salting password, making them securely stored
 # Requests
 ## Post requests
 - http://localhost:3001/users?type=login
  - This is for logging in to an existing account
  - Required data in body: username, password
 - http://localhost:3001/users?type=register
  - This is for creating a new account
  - Required data in body: username, password, email