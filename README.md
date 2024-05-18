PassMan
Description
PassMan is a non-deployed application that uses the MERN stack to implement the functionalities of saving passwords for users. It allows users to register via their email, verify their email via an OTP, and then log in to save passwords for various websites. The password list currently supports adding and deleting passwords, with future plans to include editing existing passwords. Users must be logged in to access content, and each user can only access their own saved passwords. Unauthorized access attempts result in an error. Users can log out as well. Key libraries used include bcrypt, json-web-token, nodemailer, react-router-dom, and Tailwind CSS for UI/UX design.

Installation
To set up PassMan locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/PassMan.git
Navigate to the backend directory and install dependencies:

bash
Copy code
cd PassMan/backend
npm install
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd ../frontend
npm install
Run the development server:

Open a terminal in the backend folder and run:
bash
Copy code
npm run dev
Open another terminal in the frontend folder and run:
bash
Copy code
npm run dev
Usage
Register: Sign up with your email address.
Email Verification: Verify your email via the OTP sent to your email.
Login: Log in to your account.
Manage Passwords: Add and delete passwords for different websites.
Future Features: Editing existing passwords (coming soon).
Logout: Log out of your account.
Features
User registration with email verification via OTP.
Secure password storage.
Add and delete passwords.
User authentication and authorization.
Tailwind CSS for modern UI/UX design.
Contributing
Contributions are welcome! Please follow these guidelines:


PS: I really suck at Git so currently all code is available on the dev branch. Sorry


Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.
