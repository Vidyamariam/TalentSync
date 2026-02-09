import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  ArrowRightIcon,
  Book,
  BookOpenIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();

  console.log(location, "location");
  const isActive = (path) => location.pathname === path;
  return (
    <>
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Name */}
            <Link
              to={"/"}
              className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                <Sparkles className="size-6 text-white " />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                  Talent Sync
                </span>
                <span className="text-xs text-base-content/60 font-medium -mt-1">
                  Code Together
                </span>
              </div>
            </Link>

            {/* PROBLEMS LINK */}
            <div className="flex items-center gap-3">
              <Link
                to={"/problems"}
                className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive("/problems")
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                }`}
              >
                <div className="flex items-center gap-x-2.5">
                  {" "}
                  <BookOpenIcon className="size-4" />
                  <span className="font-medium hidden sm:inline ">
                    Problems
                  </span>
                </div>
              </Link>

              {/* DASHBOARD LINK */}
              <Link
                to={"/dashboard"}
                className={`px-4 py-2.5 transition-all duration-200 ${
                  isActive("/dashboard")
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                }`}
              >
                <div className="flex items-center gap-x-2.5">
                  {" "}
                  <LayoutDashboardIcon className="size-4" />
                  <span className="font-medium hidden sm:inline ">
                    Dashboard
                  </span>
                </div>
              </Link>

              {/* USER ICON  */}
              <div className="ml-2 mt-2">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
