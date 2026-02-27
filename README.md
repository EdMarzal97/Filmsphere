# FilmSphere – Full Stack Project

This project is a full-stack application for managing Movies, Actors, and Movie Ratings.

Backend is built with NestJS and TypeScript.  
Frontend is built with Next.js, TypeScript, and TailwindCSS.

---

## Backend – Setup and Run

### Requirements
- Node.js (v18 or higher)
- PostgreSQL
- npm

### Environment Variables

Create a `.env` file inside the `backend` folder, in the email I sent the example.

### Install Dependencies

cd backend  
npm install  

### Run Backend

npm run start:dev  

Backend will run at:

http://localhost:5000

### Seed Database

To reset and seed the database with sample data:

npm run seed  

---

## Frontend – Setup and Run

### Environment Variables

Create a `.env.local` file inside `frontend/filmsphere`, sent it on email.

### Install Dependencies

cd frontend/filmsphere  
npm install  

### Run Frontend

npm run dev  

Frontend will run at:

http://localhost:3000

---

## API Endpoints Usage

### Movies

GET /movies  
Returns all movies

GET /movies?q=search  
Search movies by title (partial match)

GET /movies/:id  
Get movie details including actors and ratings

POST /movies  
Create a movie (requires API token)

---

### Actors

GET /actors  
Returns all actors

GET /actors?q=search  
Search actors by name (partial match)

GET /actors/:id  
Get actor details

GET /actors/:id/movies  
Get all movies an actor appeared in

---

### Ratings

POST /ratings  
Create a rating for a movie

PUT /ratings/:id  
Update a rating (requires API token)

DELETE /ratings/:id  
Delete a rating (requires API token)

---

### Authentication

Create, Update, and Delete operations require a token.

Send the token using the Authorization header:

Authorization: Bearer supersecrettoken

---

## Additional Comments

- The backend follows NestJS modular architecture and SOLID principles.
- Database schema is defined using a code-first approach with TypeORM.
- The frontend consumes the API using Axios and provides basic error handling.
- Bonus features such as pagination and authentication UI were skipped due to time constraints.
