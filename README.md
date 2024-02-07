# Complaint Lodging Application

This project is a complaint lodging application that consists of a .NET Web API backend and a React frontend. It allows users to submit complaints and track their status.

## Prerequisites
Before you begin, ensure you have the following prerequisites:

- Node.js installed on your local machine
- A compatible browser such as Google Chrome or Mozilla Firefox

## Backend (ASP.NET Web API)

### Description

The backend of the application is built using ASP.NET Web API. It provides endpoints to handle user authentication, complaint submission, and status tracking.

### Features

- User authentication using JWT (JSON Web Tokens)
- Endpoints for complaint submission, retrieval, and status tracking
- Secure data storage and retrieval using Entity Framework Core
- Logging of API requests and responses for debugging and auditing

### Technologies Used

- ADO.NET
- C#
- Swagger UI for API documentation

### Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Navigate to the Backend Directory:**
   ```bash
   cd your-repo/backend
   ```

3. **Install Dependencies:**
   - Use the NuGet package manager to restore any required dependencies:
     ```bash
     nuget restore
     ```

4. **Run the Backend Server:**
   - Configure your .NET environment to run the backend server. For example, you might use Visual Studio to build and run the solution, or you can use the dotnet CLI to run the project.

   The backend API will be accessible at the specified endpoint.

## Frontend (React)

### Description

The frontend of the application is built using React. It provides a user-friendly interface for users to submit complaints, view their status, and interact with the application.

### Features

- User-friendly interface with responsive design
- Form validation for complaint submission
- Real-time updates of complaint status using asynchronous requests
- Interactive dashboard for users to manage their complaints

### Technologies Used

- React.js
- JavaScript
- HTML/CSS
- React Router for client-side routing
- Fetch API for handling asynchronous requests to the backend API
- Bootstrap framework for responsive and appealing UI design
- React Toastify for displaying notification messages

### Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Navigate to the Frontend Directory:**
   ```bash
   cd your-repo/frontend
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Development Server:**
   ```bash
   npm start
   ```

   The React application will be served at `http://localhost:3000`.

## User Interface
- Admin Login
![adminlogin](/img/AdminLogin.png)
- Complaint Status
![Complaint Status](/img/ComplaintStatus.png)
- Hostel Manager Complaint
![Hostel Manager Complaint](/img/HostelManComp.png)
- Hostel Student Complaint
![Hostel Student Complaint](/img/HostelStudComp.png)
- House Complaint
![House Complaint](/img/HouseComp.png)
- JE Dashboard
![Dashboard](/img/JEDash.png)
- Register JE
![Register JE](/img/RegisterJE.png)
- Super Admin Dashboard
![Super Admin Dashboard](/img/SuperAdmin.png)
- View Complaint
![View Complaint](/img/ViewComplaint.png)

## Author

- Zeeshan Saifi
