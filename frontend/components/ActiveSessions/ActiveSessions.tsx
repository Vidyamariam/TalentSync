import React from "react";
import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { SessionData } from "../../src/lib/types";
import { getDifficultyBadgeClass } from "../../src/lib/utils";

interface activeSessionProps {
  activeSessions: SessionData[];
  isloading: boolean;
  isUserInSession: (data: SessionData) => boolean;
}

function ActiveSessions({
  activeSessions,
  isloading,
  isUserInSession,
}: activeSessionProps) {
  return (
    <div className="lg:col-span-2 card bg-base-100 border-2 border-primary/20 hover:border-primary/40 h-full">
      <div className="card-body">
        {/* HEADER SECTION */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <ZapIcon className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-black">Active Sessions</h2>
          </div>

          <div className="flex items-center gap-2 ">
            <div className="size-2 bg-success rounded-full" />
            <span className="text-lg text-success">
              {activeSessions.length} Active
            </span>
          </div>
        </div>
        {/* SESSION LIST */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {isloading ? (
            <LoaderIcon className="w-6 h-6 animate-spin text-primary mx-auto" />
          ) : activeSessions.length ? (
            activeSessions.map((session) => (
              <div className="card bg-base-200 border-2 border-base-300 hover:border-base-primary/50">
                <div className="flex items-center justify-between gap-4 p-4">
                  {/* Left */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Code2Icon className="size-7 text-white" />
                      <div className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-white font-black">
                          {session.problemTitle}
                        </h2>
                        <span
                          className={`badge badger-sm ${getDifficultyBadgeClass(
                            session.difficulty,
                          )}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm opacity-80 mt-1.5">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-5" />
                          <span>{session.host.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span className="text-sm">
                            {session.participant ? "2/2" : "1/2"}
                          </span>
                          {session.participant && !isUserInSession ? (
                            <span className="badge badge-error badge-sm">
                              FULL
                            </span>
                          ) : (
                            <span className="badge badge-success badge-sm">
                              OPEN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  {session.participant && !isUserInSession(session) ? (
                    <button className="btn btn-disabled btn-sm">Full</button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="btn btn-primary btn-sm gap-2"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-primary/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">
                No active sessions
              </p>
              <p className="text-sm opacity-50">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;
