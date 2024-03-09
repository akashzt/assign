#  Assignment Completion

## Description
I have successfully  Develop a backend for a Grievance System with integrated chat functionality using NodeJS, ExpressJS, and MongoDB. The system will allow employees to raise grievances and HR to respond and resolve these issues within 24 hours. It should include authentication and role-based access control.  
## Implementation Details
- **Language:** JavaScript
- **Framework:** Express.js
- **Node.js Version:** 20 LTS
- **Database:** MongoDB

## Frontend Routes
1. **Login Page**: `/login`
   - This route provides a form for users to log in. Upon successful authentication, users are redirected to their profile.

2. **Register Page**: `/dashboard`
   - This route provides a form for users to Register.users are redirected to their profile.

3. **Profile**: `/profile`
   - This routes provide All grievance if hr is login.and if the user is employee the he can see his own grievance.
   - if the user is employee then it has one option to chat on respective grievance.
   - if the user is hr then it has two button edit and chat.
   - hr can change status of grievance.
   - any hr can chat to any grievance.

4. **404 Page**: `/404`
   - Custom page for non-existent routes.

## Scripts
- **start:dev:** Runs the application in development mode using nodemon.
- **start:prod:** Starts the application in production mode after the build process.

## Instructions
1. Clone the repository: `git clone [repository_url]`
2. Switch to the desired branch: `git checkout [branch_name]`
3. Install dependencies: `npm install`
4. Run the application:
   - Development mode: `npm run start:dev`
   - Production mode: `npm run start:prod`
5. Access the API endpoints based on the specified routes.


## Environment Variables
Before running the application, ensure you have set the following environment variables:

You can set these environment variables in a `.env` file in the root directory of the project or through your system's environment variables.

Example `.env` file:

Env variable are:-

monogoDbUrl=mongodb+srv://akash12:Akash1234@cluster0.cv5byxz.mongodb.net/?retryWrites=true&w=majority

expires=1h,

secret=nypr355uiopy

nodemailEmail=darwin54@ethereal.email

nodemailpassword=ab2tKXXP9aZ9yyHa9M

emailFrom=noreply@grievance.com

emailHost=smtp.ethereal.email

emailPort=587



## Author
Akash Kumar

## Contact
For any inquiries or assistance, please contact me at akashcse201620@gmail.com.
