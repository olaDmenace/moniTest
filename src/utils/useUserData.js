"use client";
import { useEffect, useState } from "react";
import { auth } from "../lib/db";
import { useRouter } from "next/navigation";

const useUserData = () => {
  const [user, setUser] = useState(null);

  const route = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        setUser(null);
        route.push("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useUserData;
