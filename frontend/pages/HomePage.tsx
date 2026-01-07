import React from "react";
import {
  Play,
  Code2,
  Users,
  Activity,
  Clock,
  Sparkles,
  Check,
  ArrowBigRightDash,
  ArrowRight,
  Video,
  VideoIcon,
  Code2Icon,
  UsersIcon,
  ArrowRightIcon,
} from "lucide-react"; // Assuming you use lucide-react for icons, or remove them if not needed.
import { Link } from "react-router";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300 font-sans text-gray-900">
      {/* --- Navbar Section --- */}
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

            {/* Right: Get Started Button */}
            <SignInButton mode="modal">
              <div className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer">
                <span>Get Started</span>
                <ArrowRightIcon className="size-4 group-hover:translate-0.5" />
              </div>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* --- Main Body Section --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* --- Left Column: Content --- */}
          <div className="space-y-8">
            {/* Headline & Paragraph */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-extrabold text-primary via-text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight">
                Code together, <br />
                <span className="text-white">Learn together.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Experience real-time collaboration with zero latency. Whether
                you are debugging a complex issue or teaching a peer, Talent
                Sync keeps you in the flow.
              </p>
            </div>

            {/* Capsules (Features) */}
            <div className="flex flex-wrap gap-3">
              <button className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-primary">
                <Check className="size-4" />
                Live video chat
              </button>
              <button className="btn btn-xs sm:btn-sm md:btn-md  btn-outline btn-primary">
                <Check className="size-4" />
                Code editor
              </button>
              <button className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-primary">
                <Check className="size-4" />
                Multi-language
              </button>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary">
                Start coding now
                <ArrowRight className="size-4 sm:size-4.5 md:size-5 lg:size-6 xl-size-8" />
              </button>
              <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-outline btn-secondary">
                <Video className="size-4 sm:size-4.5 md:size-5 lg:size-6 xl-size-8" />
                Watch Demo
              </button>
            </div>

            {/* Statistics Section */}
            <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Users size={16} />
                  <span className="text-xs text-primary">Active Users</span>
                </div>
                <div className="text-2xl text-primary">12k+</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Activity size={16} />
                  <span className="text-xs text-secondary">Total Sessions</span>
                </div>
                <div className="text-2xl text-secondary">45k+</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Clock size={16} />
                  <span className="text-xs text-accent">Uptime</span>
                </div>
                <div className="text-2xl text-accent">99.9%</div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Image --- */}
          <div className="relative">
            {/* Decorative background blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>

            {/* Using a placeholder image representing a collaborative coding environment.
                In a real app, replace this src with your actual asset.
             */}

            <img
              src="/heroimg.png"
              alt="Team coding together"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-white">
            Everything You Need to{" "}
            <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during
                interviews
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple
                language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other
                in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
