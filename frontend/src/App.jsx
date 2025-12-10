import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Navigate, Route, Router, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import ProblemsPage from "../pages/ProblemsPage";
import { Toaster } from "react-hot-toast";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route
          path={"/problems"}
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;

//todo: tanstack query for data fetching and caching
