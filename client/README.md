# React + TypeScript + Vite

A basic frontend application for performing CRUD applications on users in a database.

## Project setup

```bash
# Install node modules
$ npm install

# Start the application
$ npm run dev

# Visit the site at localhost:5173
```

## Backend API

All API calls currently reference localhost:3000.
| Method | Route | Parameters | Function |
|-|-|-|-|
| GET | /users | | Get a list of all users |
| POST | /user | {email: string, name: string} | Create and add a new user |
| PUT | /user/:id | {email: string, name: string} | Update selected user with a given id |
| DELETE | /user/:id | | Delete selected user with a given id |