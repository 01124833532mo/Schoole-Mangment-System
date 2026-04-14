# School Management System

A modern **School Management System** built with a **.NET backend** and **Angular frontend**.  
This application is designed to help schools manage students, teachers, classes, attendance, exams, fees, and announcements in one centralized platform.

---

## Features

- Student registration and profile management
- Teacher and staff management
- Class and section management
- Attendance tracking
- Exam and result management
- Fee collection and payment tracking
- Notice and announcement board
- Role-based authentication and authorization
- Interactive dashboard with statistics
- Search, filter, and reporting tools
- Responsive and user-friendly UI

---

## Tech Stack

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3 / SCSS
- Bootstrap / Angular Material

### Backend
- ASP.NET Core
- C#
- Entity Framework Core
- RESTful APIs
- JWT Authentication

### Database
- SQL Server

---

## Project Structure

```bash
project-root/
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   ├── Migrations/
│   └── appsettings.json
├── frontend/
│   ├── src/
│   ├── app/
│   ├── assets/
│   └── angular.json
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- SQL Server

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/01124833532mo/Schoole-Mangment-Sys.git
cd Schoole-Mangment-Sys
```

### 2. Setup the backend

Navigate to the backend folder and restore dependencies:

```bash
cd backend
dotnet restore
```

Update your database connection string in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=SchoolManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Apply migrations and run the backend:

```bash
dotnet ef database update
dotnet run
```

### 3. Setup the frontend

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
ng serve
```

The Angular app will usually run at:

```bash
http://localhost:4200
```

The backend API will usually run at:

```bash
http://localhost:5000
```

---

## Usage

1. Launch the backend API.
2. Start the Angular frontend.
3. Log in as an admin, teacher, or staff member.
4. Manage school data from the dashboard.
5. View reports, attendance, exams, and fee information.

---

## API Overview

> Add your API endpoints here once finalized.

Example endpoints:

- `GET /api/students`
- `POST /api/students`
- `GET /api/teachers`
- `POST /api/attendance`
- `GET /api/exams/results`

---

## Environment Variables

### Backend `.env` or `appsettings.json`
```json
{
  "Jwt": {
    "Key": "your-secret-key",
    "Issuer": "your-issuer",
    "Audience": "your-audience"
  }
}
```

### Frontend `environment.ts`
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

---

## Features in Detail

### Admin
- Manage users and permissions
- Add/edit students, teachers, and classes
- Generate reports
- Monitor school operations

### Teacher
- Take attendance
- Enter marks
- View assigned classes
- Publish remarks and results

### Student / Parent
- View attendance
- Check exam results
- Read notices
- Track fee status

---

## Screenshots

> Add your project screenshots here.

```md
![Login](assets/screenshots/login.png)
![Dashboard](assets/screenshots/dashboard.png)
![Students](assets/screenshots/students.png)
```

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

---

## License

This project is licensed under the MIT License.  
See the `LICENSE` file for more details.

---

## Contact

- **GitHub:** [01124833532mo](https://github.com/01124833532mo)

---

## Acknowledgements

Thanks to everyone who helped build and improve this project.
