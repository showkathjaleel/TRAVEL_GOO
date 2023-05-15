# TRAVEL_GOO


This is a social media application  for travellers  built with React that allows users to create profiles, share posts and connect with friends/followers .It allows users to search and view upcoming trips, join the trip , and chat with friends in real-time.

Features

- Real time Chat  using socket.io that allows  bidirectional communication between clients and servers .
- Video Call using ZegoCloud (A cloud-based platform for building video call )
- Payment Integration (Razorpay) 
- Implemented Lazy loading for improved performance.
-  Storing images in Amazon S3 bucket  to reduce the memory of API calls
- View upcoming trips, destination to visit , joined members in the trip .
- Guide can host a trip by giving the necesary details 
- Social media features that includes like and comment to a post

Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Redux: A predictable state container for managing application state.
- Express: A web application framework for Node.js that simplifies HTTP requests and routing.
- MongoDB: A NoSQL database for storing unstructured data at scale.
- Socket.IO: A JavaScript library for real-time, bidirectional communication between clients and servers.
- ZegoCloud: A cloud-based platform for building and deploying real-time communication applications, including video chat and live streaming.
- Tailwind: A popular CSS framework for styling user interfaces.


Setup and Installation

To set up the project locally, follow these steps:

- Clone the repository to your local machine using git clone.
- Navigate to the project directory and install dependencies using npm install.
- Create a .env file in the root of the project and add your ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY, RAZORPAY_KEY_ID
, RAZORPAY_KEY_SECRET configuration. - Start the development server using npm start.
- Open your web browser and go to http://localhost:3000 to see the app running locally.
