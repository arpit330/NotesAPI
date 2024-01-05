# RESTful API for Notes sharing app

A secure and scalable RESTful API for managing and sharing notes. This project is built using Node.js, Express.js, MongoDB, and Mongoose. 

## Table of Contents

- [Project Overview](#project-overview)
- [API Endpoints](#api-endpoints)
- [Setup and Installation](#setup-and-installation)
- [Testing](#testing)

## Project Overview

The project is implemented using Node.js and Express.js for the backend, MongoDB as the database, and Mongoose as the ODM.
It includes user authentication using JsonWebToken , rate limiting, request throttling, and powerful search functionality.


## API Endpoints

### Authentication Endpoints

- **POST /api/auth/signup:** Create a new user account.
- **POST /api/auth/login:** Log in to an existing user account and receive an access token.

### Note Endpoints

- **GET /api/notes:** Get a list of all notes for the authenticated user.
- **GET /api/notes/:id:** Get a note by ID for the authenticated user.
- **POST /api/notes:** Create a new note for the authenticated user.
- **PUT /api/notes/:id:** Update an existing note by ID for the authenticated user.
- **DELETE /api/notes/:id:** Delete a note by ID for the authenticated user.
- **POST /api/notes/:id/share:** Share a note with another user for the authenticated user.
- **GET /api/search?q=:query:** Search for notes based on keywords for the authenticated user.



#### Project Details

- Choice of Framework/DB/3rd Party Tools
  - **Framework:** Express.js was chosen for its simplicity and flexibility.
  - **Database:** MongoDB with Mongoose for a NoSQL solution that scales well.
  - **Authentication:** JWT (JSON Web Tokens) for secure authentication.
  - **Rate Limiting/Request Throttling:** Implemented using express-rate-limit middleware.
  - **Search Functionality:** MongoDB text indexing for efficient keyword-based search.

#### Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/notekeeper.git

2. Run <code> npm install </code>

3. Run <code> npm run dev </code>


