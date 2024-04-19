"use client";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import SignIn from "../components/membershipForms/SignIn";
import SignUp from "../components/membershipForms/SignUp";
import Navbar from "../components/navigation/Navbar";
import { auth, createUserWithEmailAndPassword, updateProfile } from "../lib/db";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../lib/db";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [bg, setBg] = useState("bg-red-700");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const showNewForm = () => {
    setLogin(!login);
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setEmail("");
    setError(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (login) {
      if (!email || !password) {
        setError("Input fields cannot be empty");
      } else {
        setLoading(true);
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          // Signed in
          const user = userCredential.user;
          setBg("bg-green-700");
          setError("Account login success");
          setEmail("");
          setPassword("");
          router.push("/dashboard"); // Redirect to dashboard after successful login
        } catch (error) {
          console.log(error.message);
          if ((error = "Firebase: Error (auth/invalid-credential).")) {
            setError("Invalid login credentials");
          } else {
            setError("Failed to sign in, please try again");
          }
        }
        setLoading(false);
      }
    } else {
      if (!fullName || !email || !password) {
        setError("Input fields cannot be empty!");
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
        } else {
          setLoading(true);
          try {
            const userCredential = await createUserWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;

            await updateProfile(user, { displayName: fullName });

            await setDoc(doc(firestore, "users", user.uid), {
              email: user.email,
              displayName: fullName,
              photoURL: "",
              walletBallance: 0,
              transactionHistory: [],
            });
            // User created successfully
            setError("User created successfully");
            setBg("bg-green-700");
            setLoading(false);
            setPassword("");
            setFullName("");
            setConfirmPassword("");
            setEmail("");
            setTimeout(() => {
              setLogin(true);
            }, 5000);
            return user;
          } catch (error) {
            // Handle sign-up errors
            console.error("Error signing up:", error, error.message);
            if (error.code === "auth/email-already-in-use") {
              setError("This email address is already in use");
            } else {
              setError("Account creation failed");
            }
            setLoading(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError(false);
      }
    }, 5000);
    setBg("bg-red-700");
  }, [error]);

  return (
    <main className="min-h-screen w-full flex-1">
      <Navbar />
      <div className="grid md:grid-flow-col mx-auto md:grid-cols-2 md:px-6 md:pt-[10%] lg:pt-0 xl:pt-[5%] lg:max-w-7xl">
        <div className="px-[5%] py-4 space-y-4 h-full">
          <div>
            <h2 className="font-bold text-2xl">Get Started</h2>
            <p className="font-medium">
              Simplify and streamline your global payments to suppliers,
              vendors, and service providers with our seamless global payment
              solution. Get started by filling the form.
            </p>
          </div>
          <ul className="font-medium grid gap-5">
            <li className="grid grid-flow-col grid-cols-12 gap-[5%] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-yalaPrimary"
              >
                <path
                  fillRule="evenodd"
                  d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="col-span-11">
                Pay your vendors and suppliers in currency of choice (Euro, USD
                etc.).
              </p>
            </li>
            <li className="grid grid-flow-col grid-cols-12 gap-[5px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-yalaPrimary"
              >
                <path
                  fillRule="evenodd"
                  d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="col-span-11">
                Fast and low-cost payments guaranteed.
              </p>
            </li>
          </ul>
          <div className="font-medium text-sm space-y-8 hidden md:block">
            <div className="space-y-2">
              <h6 className="text-sm">
                {login ? "Don't have an accoount?" : "Already have an account?"}
              </h6>
              <PrimaryButton
                title={
                  login ? "Sign up for an account" : "Log in to your account"
                }
                onClick={showNewForm}
              />
            </div>
            <div className="space-y-2">
              <p>For more information, please contact</p>

              <a
                href="mailto:payments@useyala.com"
                className="font-bold block text-yalaPrimary w-fit"
              >
                payments@useyala.com
              </a>
            </div>
          </div>
        </div>
        <div className="text-sm px-[5%] space-y-8 lg:space-y-5 grid">
          <form className="grid h-full gap-4 content-center">
            {login ? (
              <SignIn
                password={password}
                email={email}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            ) : (
              <SignUp
                password={password}
                setPassword={setPassword}
                email={email}
                setEmail={setEmail}
                fullName={fullName}
                setFullName={setFullName}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}
            <SecondaryButton
              title={loading ? "Loading..." : "Continue"}
              disabled={loading}
              onClick={handleProfileUpdate}
              state={loading}
            />
          </form>
          {error && (
            <p
              className={`${bg} grid place-content-center font-medium text-white min-h-10 rounded-md`}
            >
              {error}
            </p>
          )}
          <div className="text-center font-medium">
            By clicking on continue, you have accepted the{" "}
            <button className="font-bold text-yalaPrimary block mx-auto">
              Terms and Conditions
            </button>
          </div>
        </div>
        <div className="font-medium text-sm space-y-8 px-[5%] mt-14 pb-12 md:hidden">
          <div className="space-y-2">
            <h6 className="text-sm">
              {login ? "Don't have an accoount?" : "Already have an account?"}
            </h6>
            <PrimaryButton
              title={
                login ? "Sign up for an account" : "Log in to your account"
              }
              onClick={showNewForm}
            />
          </div>
          <div className="space-y-2">
            <p>For more information, please contact</p>

            <a
              href="mailto:payments@useyala.com"
              className="font-bold block text-yalaPrimary w-fit"
            >
              payments@useyala.com
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
