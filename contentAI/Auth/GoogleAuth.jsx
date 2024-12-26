import React from "react";
import { signInWithPopup, auth, provider, signOut } from "../firebase";

const GoogleAuth = ({ onAuthSuccess }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onAuthSuccess(user);
      console.log("User Info: ", user);
    } catch (error) {
      console.error("Error during sign-in: ", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error) {
      console.error("Error during sign-out: ", error.message);
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleLogin}
      >
        Sign in with Google
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default GoogleAuth;
