import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import LoginPage from "../admin/LoginPage";
import { logOut } from "../lib/auth";
// const allowedEmails = ["ashrafp216@gmail.com", "santobawebsite@gmail.com", "gunjan.lalwani999@gmail.com"];
function AuthStateMonitor({ children }) {
  const [user, setUser] = useState("not-set");

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }; // Clean up subscription
  }, []);

  if (user) return <div>{children}</div>;
  else if (user === "not-set") return <div> {/* <Skeleton /> */}</div>;
  else return <LoginPage />;
}

export default AuthStateMonitor;
