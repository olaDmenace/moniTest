// utils/withAuth.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "../lib/db";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/"); // Redirect to login page if not authenticated
        }
      });

      return () => unsubscribe();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
