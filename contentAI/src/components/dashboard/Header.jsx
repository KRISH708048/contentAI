import React from "react";
import UsageLimit from "../pages/UsageLimit";
import Hello from "../pages/Hello";
import { useRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/authAtom";
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
} from "../../../Auth/firebase";

const Header = ({ onMenuClick }) => {
  const [user, setUser] = useRecoilState(userAtom);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      setUser({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  

  return (
    <div className="w-full md:h-16 p-2  border-b-2">
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={onMenuClick}
      >
        ☰
      </button>
      <div className="w-full h-full ">
        {user ? (
          <div className="w-full sm:justify-center md:flex items-center md:justify-between lg:justify-between">
            <UsageLimit />
            <Hello name={user.displayName.split(' ')[0]}/>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded flex justify-end"
            onClick={handleSignIn}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
