

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Fragment, lazy,Suspense } from "react";
import ForgotpasswordPage from "./Pages/ForgotpasswordPage";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
// import NLogin from './Components/Login/NLogin';
import LoginPage from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import DecodeUser from "./SharedComponents/DecodeUser";
import SavedPosts from "./Pages/SavedPosts";
import GuideLoginPage from "./Pages/GuideLoginPage";
import RegisterEventPage from "./Pages/RegisterEventPage";
// import RegisterEvent from "./SharedComponents/RegisterEvent";
import TripDetails from "./SharedComponents/TripDetails";
import Room from './Components/Room/Room'


//lazy loading
const UpcomingEvents=lazy(()=>import("./SharedComponents/UpcomingTrips")) ;
const Chat=lazy(()=>import("./Components/Chat/Chat"))
const ProfilePage=lazy(()=>import("./Pages/Profile"))
// const Room=lazy(()=>import("./Components/Room/Room"))

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
              <Route path="/profile/*" element={<Suspense fallback='Loading...'> <ProfilePage /></Suspense>} />
              <Route path="/chat" element={<Suspense fallback='Loading...'><Chat /></Suspense>} />
              <Route path="/saved" element={<SavedPosts />} />              
              <Route path="/create-event" element={<RegisterEventPage />} />      
              <Route path="/upcoming-events" element={<Suspense fallback='Loading...'> <UpcomingEvents/></Suspense>}/>             
              <Route path="/trip-details" element={<TripDetails/>} />
              <Route path="/room" element={<Room/>} />
              
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
