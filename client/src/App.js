

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Fragment, lazy,Suspense } from "react";
import ForgotpasswordPage from "./Pages/ForgotpasswordPage";
import SignupPage from "./Pages/Signup";
import HomePage from "./Pages/Home";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

import LoginPage from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import DecodeUser from "./SharedComponents/DecodeUser";
import SavedPosts from "./Pages/SavedPosts";

import RegisterEventPage from "./Pages/RegisterEventPage";
// import Room from './Components/Room/Room'
import Room from './Components/Room/Agora'
import Notifications from "./Components/Notifications/Notifications";
import Preloader from "./SharedComponents/Preloader";




//lazy loading
const UpcomingEventsPage=lazy(()=>import("./Pages/UpcomingEventsPage")) ;
const ChatPage =lazy(()=>import("./Pages/ChatPage")) ;
const ProfilePage=lazy(()=>import("./Pages/Profile"))
const TripDetailsPage =lazy(()=>import("./Pages/TripDetailsPage")) ;


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
              <Route path="/profile/*" element={<Suspense fallback={<Preloader/>}> <ProfilePage /></Suspense>} />
              <Route path="/chat" element={<Suspense fallback={<Preloader/>}><ChatPage /></Suspense>} />
              <Route path="/saved" element={<SavedPosts />} />              
              <Route path="/create-event" element={<RegisterEventPage />} />      
              <Route path="/upcoming-events" element={<Suspense fallback={<Preloader/>}> <UpcomingEventsPage/></Suspense>}/>             
              <Route path="/trip-details" element={<Suspense fallback={<Preloader/>}> <TripDetailsPage/> </Suspense> }/>
              <Route path="/room" element={<Room/>} />
              <Route path="/notifications" element={<Notifications/>} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/signup" element={<SignupPage />} />{" "}
              {/* used to prevent refreshing */}
              <Route path="/newlogin" element={<LoginPage />} />
            </Route>
         
            <Route path="/forgotpassword" element={<ForgotpasswordPage />} />

        
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
