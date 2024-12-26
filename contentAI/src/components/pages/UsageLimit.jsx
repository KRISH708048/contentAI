import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/atoms/tokens";
import { userAtom } from "../../store/atoms/authAtom";

const UsageLimit = () => {

  const [usage, setUsage] = useRecoilState(tokenAtom);
  const user = useRecoilValue(userAtom);
  const getToken = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/usage?userID=${user.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch usage data");
      }

      const data = await response.json();
      setUsage(data.totalWords || 0);
    } catch (error) {
      console.error("Error fetching usage:", error);
    }
  };

  useEffect(() => {
    // if (user) {
      console.log("usage check");
      getToken();
      console.log(usage);
    // }
  }, []);
  return (
    <div className="p-2 flex-col gap-2 items-center rounded-xl bg-violet-600 min-w-48 w-56 text-sm font-medium shadow-md">
      <div className="flex justify-between items-center">
        <h3 className=" text-md text-white font-semibold mb-1">Credits</h3>
        <h5 className="text-xs text-white">{usage}/10000</h5>
      </div>
      <LinearProgress determinate value={(usage/10000)*100} variant="solid" />
    </div>
  );
};

export default UsageLimit;
