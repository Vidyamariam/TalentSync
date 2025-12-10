import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

function HomePage() {
  useQuery({ queryKey: ["testapi"], queryFn: () => {} });

  return (
    <>
      <h1 className="text-red-500 bg-orange-400 p-x-20">Welcome to the App</h1>

      <div>This is Homepage</div>

      <button
        className="btn btn-secondary"
        onClick={() => toast.success("this is success toast")}
      >
        Click Me
      </button>

      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <button>Logout</button>
        </SignOutButton>
      </SignedIn>

      <UserButton />
    </>
  );
}

export default HomePage;
