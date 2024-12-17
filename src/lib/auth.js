// auth.js
import { GoogleAuthProvider, signInWithPopup, signOut, } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        // Get user info
        const user = result.user;


    } catch (error) {
        console.error("Error signing in with Google:", error.message);
    }
}

export async function logOut() {
    try {
        await signOut(auth);
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
}
