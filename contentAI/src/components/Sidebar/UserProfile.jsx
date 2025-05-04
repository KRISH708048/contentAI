import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
import avatar from "../../assets/avatar.jpg";
import {auth,signOut} from "../../../Auth/firebase"
const UserProfile = () => {
  const [user, setUser] = useRecoilState(userAtom);
  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);  
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-1/2 flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="w-full flex justify-around items-center mb-4">
          <img
            src={avatar}
            alt="User"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg text-gray-600">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">
              Gender: {user.gender || "Not provided"}
            </p>
            <button
              className="ml-4 mt-4 bg-red-500 text-white px-3 py-1 rounded"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
