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
import DashboardPage from "../pages/DashboardPage";
import ProblemDetailPage from "../pages/ProblemDetailPage";
import SessionPage from "../pages/SessionPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  //This is to get rid of the flicker issue while checking auth state or if user is signed in
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route
          path={"/"}
          element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path={"/dashboard"}
          element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path={"/problems"}
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
        />
        <Route
          path={"/problem/:id"}
          element={isSignedIn ? <ProblemDetailPage /> : <Navigate to="/" />}
        />
        <Route
          path={"/session/:id"}
          element={isSignedIn ? <SessionPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;

//todo: tanstack query for data fetching and caching
