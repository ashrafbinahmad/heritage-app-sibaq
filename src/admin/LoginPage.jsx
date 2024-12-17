import { signInWithGoogle } from "../lib/auth";

export default function LoginPage() {
    const handleGoogleSignIn = async () => {
        const user = await signInWithGoogle();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div>
                <h1 className="pb-5 font-bold text-center text-lg">Sign In with Google</h1>
                <button onClick={handleGoogleSignIn} className="flex justify-center items-center gap-3 bg-gray-100 hover:bg-gray-300 p-9 rounded-md text-lg" style={{ padding: "10px", fontSize: "16px" }}>
                    <img className="w-10" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" /> Sign In with Google
                </button>
            </div>
        </div>
    );
}