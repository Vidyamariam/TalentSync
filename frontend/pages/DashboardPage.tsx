import { useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { data, useNavigate } from "react-router";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../src/hooks/useSessions";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar";
import WelcomeSection from "../components/WelcomeSection/WelcomeSection";
import StatsCard from "../components/StatsCard/StatsCard";
import ActiveSessions from "../components/ActiveSessions/ActiveSessions";
import RecentSessions from "../components/RecentSessions/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const user = useUser();
  const [showCreateModal, setSHowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
    isPrivate: false,
  });

  const createSessionMutation = useCreateSession();

  const handleCreateRoom = () => {
    try {
      if (!roomConfig.problem || !roomConfig.difficulty) {
        return;
      }

      console.log(roomConfig, "roomConfig");

      createSessionMutation.mutate(
        {
          problemTitle: roomConfig.problem,
          difficulty: roomConfig.difficulty?.toLowerCase(),
          isPrivate: roomConfig.isPrivate,
        },
        {
          onSuccess: (data) => {
            console.log(data, "data");
            setSHowCreateModal(false);
            navigate(`/session/${data.session._id}`);
          },
        },
      );
    } catch (err: any) {
      toast.error("Error  creating room", err);
    }
  };

  const { data: activeSessionData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: myRecentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const activeSessions = activeSessionData?.sessions || [];
  const recentSessions = myRecentSessionsData?.sessions || [];

  console.log(activeSessions, "activeSessions");
  console.log(recentSessions, "recentSessions");

  const isUserInSession = (session: any) => {
    if (!user.user?.id) return false;

    return (
      session.host.clerkId === user.user.id ||
      session.participant?.clerkId === user.user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />

        <WelcomeSection onCreateSession={() => setSHowCreateModal(true)} />

        {/* Grid layout */}
        <div className="container max-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Card*/}
            <StatsCard
              activeSessionsCount={activeSessions?.length}
              recentSessionsCount={recentSessions?.length}
            />
            {/* Active Sessions */}
            <ActiveSessions
              activeSessions={activeSessions}
              isloading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>
          {/* Recent Sessions */}
          <RecentSessions
            sessions={recentSessions}
            isLoading={loadingRecentSessions}
          />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setSHowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;
