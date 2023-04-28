
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Fragment, lazy,Suspense } from "react";

import ForgotpasswordPage from "./Pages/ForgotpasswordPage";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";

import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import DecodeUser from "./SharedComponents/DecodeUser";

import HomePage from "./Pages/Home";
import SavedPosts from "./Pages/SavedPosts";
import RegisterEventPage from "./Pages/RegisterEventPage";
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
              <Route path="/profile/*" element={<Suspense fallback={<Preloader/>}> <ProfilePage /></Suspense>} />
              <Route path="/chat" element={<Suspense fallback={<Preloader/>}><ChatPage /></Suspense>} />
              <Route path="/saved" element={<SavedPosts />} />              
              <Route path="/create-event" element={<RegisterEventPage />} />      
              <Route path="/upcoming-events" element={<Suspense fallback={<Preloader/>}> <UpcomingEventsPage/></Suspense>}/>             
              <Route path="/trip-details" element={<Suspense fallback={<Preloader/>}> <TripDetailsPage/> </Suspense> }/>
              <Route path="/room" element={<Room/>} />
              <Route path="/notifications" element={<Notifications/>} />
              
                </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/signup" element={<SignupPage />} />
              {/* used to prevent refreshing */}
              <Route path="/newlogin" element={<LoginPage />} />

              <Route path="/forgotpassword" element={<ForgotpasswordPage />} />
            </Route>
         
           

        
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
