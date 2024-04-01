# RATING MOVIES PROJECT

This is a simple project for rating films, built with Node.js, Express and MySQL, using Sequelize as the ORM.

## Requirements

Before running this project locally, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/)

## Installation

Clone this repository on your local machine:

```bash
  git clone https://github.com/seu-usuario/rating-movies.git
```

Navigate to the project directory:

```bash
  cd rating-movies
```

Install the project's dependencies using npm:

```bash
  npm install
```

## Database configuration

1. Make sure your MySQL server is running.

2. Create a MySQL database for the project. You can do this manually using MySQL Workbench or any other database administration tool.

3. Configure the database connection information in the `config/config.json` file. Replace `username`, `password` and `database` with the correct information from your database.

## Creating the Database

Before running the server, you need to create the necessary tables in the database. You can do this by running Sequelize migrations. Run the following command:

```bash
  npx sequelize-cli db:migrate
```

This command will create the necessary tables in the database based on the models defined in the project.

```bash
  npm run seed
```

This command will run the seeder and create the users in the database.

## Configuração da Chave Secreta JWT

Before running the project, you need to add a JWT secret key to the `config.json` configuration file. This secret key is used to sign and verify JWT tokens used in user authentication.

Make sure you add the secret key to the `config.json` file in the following structure:

```json
{
  "development": {
    "username": "root",
    "password": "root",
    "database": "database_development",
    "host": "localhost",
    "dialect": "mysql",
    "jwt_secret_key": "your_secret_key_here"
  },
  "test": {
    "username": "root",
    "password": "root",
    "database": "database_test",
    "host": "localhost",
    "dialect": "mysql",
    "jwt_secret_key": "your_secret_key_here"
  },
  "production": {
    "username": "root",
    "password": "root",
    "database": "database_production",
    "host": "localhost",
    "dialect": "mysql",
    "jwt_secret_key": "your_secret_key_here"
  }
}
```

## Running the Server

With all the configurations and migrations done, you're ready to launch the server. Run the following command:

```bash
  cd api
```

```bash
  npm start
```
The server will be running on http://localhost:3000 by default.

## Running the Frontend

Open another terminal. Run the following command:

```bash
  cd frontend
```

```bash
  npm start
```

Possibly the frontend will run on port [http://localhost:3001](http://localhost:3001)