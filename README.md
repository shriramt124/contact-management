### Description
This project is a Contact Management Application that allows users to add, update, view, and delete contacts. 
The application is built with React.js for the frontend and an Express.js backend, connected to a MongoDB database. 
The application supports basic CRUD operations and is designed to be user-friendly with an intuitive interface powered by Material-UI components.

### Major Features:
Add a new contact: Users can add a new contact with details such as name, email, phone number, job title, and company.
Edit contact: Users can edit an existing contact's details.
Delete contact: Users can delete a contact from the list.
List all contacts: The app displays a table of all the contacts.

## Steps to Run the Project
1. Clone the Repository
`git clone https://github.com/your-username/contact-management-app.git`
`cd contact-management-app`

2.Navigate to the backend folder:
`cd backend`

3.Install dependencies:
`npm install`

4.Create a .env file in the backend folder to store your environment variables
`touch .env`

5.Add your MongoDB URI to the .env file
`MONGODB_URI=mongodb://localhost:27017/contactdb`

6.npm run dev on both the frontend and the bakcend folder

## Database Schema

{
  "_id": ObjectId,
  "firstName": String,
  "lastName": String,
  "email": String,
  "phone": String,
  "company": String,
  "jobTitle": String
}

## Technical Decisions
* Frontend: Built with React.js to provide a dynamic and responsive UI. Material-UI was chosen for the UI components due to its simplicity and ease of use.
* Backend: Developed using Node.js with Express.js to build the RESTful API for CRUD operations. MongoDB is used as the database for storing contact information.
* State Management: The application uses React Context API to manage global state for contacts across the app.
* API Communication: The frontend communicates with the backend via Axios to handle HTTP requests.

