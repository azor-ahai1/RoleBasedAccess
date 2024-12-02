VRV Security - Role-Based Access Control (RBAC) Management System

Project Overview
A comprehensive web application for managing role-based access control with advanced security features.

Prerequisites
Node.js
npm or yarn
React
Vite

Setup Instructions:

- Clone the Repository
git clone <https://github.com/azor-ahai1/RoleBasedAccess/>
cd rolebasedaccess/frontend/rbac

- Install Dependencies
npm install

- Run the Application
npm run dev

Remember: The main index.html is in the following directory:
root/frontent/rbac/index.html

Website Structure and Features:
- The website is divided into three main sections: Users, Roles, and Permissions.
- Users, Roles and Permissions can be added, edited, and deleted.
- Users can be assigned to roles and roles can be assigned to permissions.
- The application uses a simple in-memory database for demonstration purposes.

1. Authentication Pages
The application has two authentication pages: login and register. The login page allows users to enter their username and password to access the application. The register page allows users to create a new account.

2. Dashboard
The dashboard displays a list of all users, roles, and permissions. It also includes buttons to add new users, roles, and permissions. 

- Admin Dashboard
    Profile overview
    Current and past projects
    Management buttons
    Quick access to user and admin management
- User Detail Page
    Comprehensive user profile
    Personal information
    Project and task details
    Permissions overview
- Admin Detail Page
    Detailed admin profile
    Access level and permissions
    Project involvement
    Security clearance information

3. Project Management:
The application includes a project management system that allows admins to create, edit, and delete projects. Each project can have multiple tasks assigned to it.

Technology Stack: 
- Frontend: React
- State Management: Redux
- Routing: React Router
- Styling: Tailwind CSS
- Form Handling: React Hook Form
- Icons: React Icons
- Animations: Framer Motion

Development Status :  Under Active Development 

Key Functionalities:
- User and admin management
- Project tracking
- Dynamic role assignment
- Secure authentication
- Responsive design

Contact:
Aashish Shukla
aashishshukla910@gmail.com

Here's a list of all the links in the router configuration:

- **/**                         -       Home (Home component)  
- **/login**                    -       Login (Login component)  
- **/signup**                   -       Signup (Signup component)  
- **/admin/dashboard**          -       Admin Dashboard (AdminHome component)  
- **/admin/manage-users**       -       All Users (AllUsers component)  
- **/users/:userId/view**       -       User Page (UserPage component)  
- **/users/:userId/edit**       -       Edit User Page (EditUserPage component)  
- **/admin/admins**             -       All Admins (AllAdmins component)  
- **/admins/:adminId/view**     -       Admin Page (AdminPage component)  
- **/project/projects**         -       All Projects (AllProjects component)  
- **/project/:projectId/view**  -       Project Page (ProjectPage component)  
- **/project/:projectId/edit**  -       Edit Project Page (EditProjectPage component)  
- **/project/create**           -       Create Project Page (CreateProjectPage component)  
