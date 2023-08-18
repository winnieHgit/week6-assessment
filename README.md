# The Book Club website

This project is a book club application.

It consist of the following features:

- User can register and login into the system
- User can browse throught the list of books available
- User can see how many other users are reading a book and what is their average progress
- User can start reading a book and update the progress
- User can check all the books they are reading

## Structure

The project is build with React on the front-end and Express with Prisma on the back-end.

### Front-end

It has the following pages:

- index: it is the home page
- books/:id: it is dynamic page containing the books information
- progress: it contains the progress information of all books
- register: used to register a new user
- login: used to login an existing user

### Back-end

It has the following endpoints:

- post /register: used for creating a new user
- get /users: returns all the users in the system
- post /login: used for login in a user and returns a token
- get /books: returns the information of all books in the system
- get /books:id: returns specificly a book
- post /bookprogress: creates a new progress state
- get /bookprogress: returns the information of all books in progress
- patch /bookprogress:id: updates a specific book progress when user is login
