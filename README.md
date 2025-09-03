📝 Notes App

A modern, full-stack Notes Application built with MERN stack, featuring secure authentication, OTP verification, Google login, and a sleek, responsive UI. Perfect for managing notes online in a professional, user-friendly environment.

🌐 Live Demo

Check out the deployed version:
Notes App Live
https://notes-app-frontend-wy4p.onrender.com

Screenshot of Notes App 
<img width="1917" height="1049" alt="Screenshot 2025-09-03 075435" src="https://github.com/user-attachments/assets/40d5a482-5f54-471a-8c5c-3d34a56f764c" />
<img width="1919" height="1043" alt="Screenshot 2025-09-03 075448" src="https://github.com/user-attachments/assets/e2fe51ec-2b2f-426f-a8c2-338e3976ed92" />
<img width="1919" height="1050" alt="Screenshot 2025-09-03 075514" src="https://github.com/user-attachments/assets/31f66bf2-738d-4d80-8f67-c327f666ba53" />
<img width="1915" height="1034" alt="Screenshot 2025-09-03 075538" src="https://github.com/user-attachments/assets/3826c628-53db-4d87-8a97-05955eabdb22" />

🎥 Video walkthrough:
https://drive.google.com/file/d/1kb3haOpEp_ZlmW5t3Ja4BziyRT18Vy71/view?usp=sharing

🔗 Useful Links

Frontend: Notes App Frontend [https://github.com/Aayushbhandarkar/Notes-App.git](https://notes-app-frontend-wy4p.onrender.com
)

Backend: Notes App Backend https://notes-app-backend1-ucg9.onrender.com



🛠️ Tech Stack

Frontend: React.js, HTML5, CSS3, JavaScript, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT, OTP verification, Google OAuth

Other Tools: Nodemailer for OTP emails, Render for deployment

⚡ Features

User Authentication:

Register & login securely

OTP verification via email

Google Sign-In integration

Notes Management:

Create, read, update, delete notes (CRUD)

Notes are stored securely in MongoDB

Search and filter notes

Security & Performance:

JWT-based authentication

Rate limiting (protect from brute-force attacks)

CORS configured for frontend-backend communication

User-Friendly Design:

Responsive and clean UI

Smooth animations and transitions

Accessible and intuitive layout

🔑 Authentication Flow

User registers → receives OTP via email → verifies OTP

User can also login with Google

Backend issues JWT token for secure API access

Token is used to access protected routes (CRUD notes)


👨‍💻 Author

Ayush Bhandarkar

GitHub: [github.com/ayushbhandarkar](https://github.com/Aayushbhandarkar)

LinkedIn: www.linkedin.com/in/ayush-bhandarkar-555730286

💻 Getting Started (Developer Setup)
Clone the repository:
git clone https://github.com/yourusername/notes-app.git
cd notes-app

Backend Setup:
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
CLIENT_URL=https://notes-app-frontend-y7ca.onrender.com
GOOGLE_CLIENT_ID=your_google_client_id
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


Start backend server:

npm run dev

Frontend Setup:
cd frontend
npm install
npm run build   # for production
npm run dev     # for local development

📁 Folder Structure (Backend)
backend/
├── config/       # Database connection
├── controllers/  # Route handlers
├── middleware/   # Auth, error handling
├── models/       # Mongoose models
├── routes/       # API routes
└── server.js     # Entry point
