import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/loginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Navigate } from 'react-router-dom';


function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  useEffect(()=>{
checkAuth()
  },[checkAuth]);
  console.log("authUser in App.jsx", authUser);

  if(isCheckingAuth && !authUser )return(
    <div className ="flex items-center justify-center h-screen">
      <Loader className ="size-10 animate-spin" />
    </div>
  );

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to= "/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to= "/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to= "/login" />} />
      </Routes>
    </>
  );
}

export default App;
