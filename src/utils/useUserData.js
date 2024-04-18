"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/db";
// import { auth } from "../../lib/db";
import { useRouter } from "next/navigation";

const useUserData = () => {
  const [user, setUser] = useState(null);

  const route = useRouter();

  useEffect(() => {
    // Firebase listener for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null); // Reset user state
        route.push("/");
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return user;
};

export default useUserData;
