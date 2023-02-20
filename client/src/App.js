/* eslint-disable react/prop-types */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Fragment } from "react";
import Chat from "./Components/Chat/Chat";
import ForgotpasswordPage from "./Pages/ForgotpasswordPage";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
// import NLogin from './Components/Login/NLogin';
import LoginPage from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./Pages/Profile";
import DecodeUser from "./SharedComponents/DecodeUser";
import SavedPosts from "./Pages/SavedPosts";
import GuideLoginPage from "./Pages/GuideLoginPage";
import RegisterEvent from "./SharedComponents/RegisterEvent";
import UpcomingEvents from "./SharedComponents/UpcomingTrips";
import TripDetails from "./SharedComponents/TripDetails";
import Room from "./Components/Room/Room";
function App() {
  return (
    <div>
      <Router>
        <Fragment>
          <Routes>
            <Route element={<DecodeUser />}>
              <Route element={<PrivateRoute />}>
                <Route exact path="/" element={<HomePage />} />
              </Route>
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/saved" element={<SavedPosts />} />              
              <Route path="/create-event" element={<RegisterEvent />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/trip-details" element={<TripDetails/>} />
              <Route path="/room/:roomId" element={<Room/>} />
              
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/signup" element={<SignupPage />} />{" "}
              {/* used to prevent refreshing */}
              <Route path="/newlogin" element={<LoginPage />} />
            </Route>

            <Route path="/guidelogin" element={<GuideLoginPage />} />

            <Route path="/forgotpassword" element={<ForgotpasswordPage />} />

            {/* upcomingEvents     */}
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
