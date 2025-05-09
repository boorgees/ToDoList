# ToDoList Project

A full stack task management application built with .NET Core Web API backend and Angular frontend.

## Project Structure

```
├── backend/
│   └── ToDoLista.api/         # .NET Core Web API project
│       ├── Controllers/       
│       ├── Services/
│       ├── Repositories/ 
│       └── Data/              # Database context and models
└── frontend/
    └── todolista/            # Angular application
```

## Backend (.NET Core)

### Prerequisites
- .NET 8.0
- PostgreSQL Database

### Configuration
The backend API uses PostgreSQL as the database. Configure your connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your PostgreSQL connection string"
  }
}
```

### Running the Backend
1. Navigate to the backend directory:
```sh
cd backend/ToDoLista.api
```

2. Run the application:
```sh
dotnet run
```

The API will be available at `https://localhost:5001` (or your configured port)

## Frontend (Angular)

### Prerequisites
- Node.js
- Angular CLI 

### Running the Frontend
1. Navigate to the frontend directory:
```sh
cd frontend/todolista
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
ng serve
```

The application will be available at `http://localhost:4200`

## Features
- Create, read, update and delete tasks
- Task status management
- RESTful API backend
- Modern Angular frontend

## Technology Stack
- Backend:
  - .NET 8.0
  - Entity Framework Core
  - PostgreSQL
  - Swagger/OpenAPI
- Frontend:
  - Angular
  - TypeScript
  - Angular CLI

## Project Setup

1. Clone the repository
2. Set up the database and update connection string
3. Run backend API
4. Run frontend application
5. Access the application in your browser

## Documentation
The API endpoints can be explored through Swagger UI when running in development mode at:
```
https://localhost:5001/swagger
```

For more details about using the Angular frontend, see the frontend README.