import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useGetSessionById,
  useJoinSession,
} from "../src/hooks/useSessions";
import { PROBLEMS } from "../src/data/problems";
import { executeCode, ExecuteCodeResult } from "../src/lib/piston";
import Navbar from "../components/Navbar/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../src/lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import OutputPanel from "../components/OutputPanel/OutputPanel";
import useStreamClient from "../src/hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI/VideoCallUI";

const SessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState<ExecuteCodeResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const {
    data: sessionData,
    isLoading: LoadingSession,
    refetch,
  } = useGetSessionById(id || "");

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  console.log(sessionData, "sessionData123");

  const session = sessionData?.session;

  console.log(session, "sessionsession");
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;
  const problemData = session?.problemTitle
    ? Object.values(PROBLEMS).find(
        (problem) => problem.title === session.problemTitle,
      )
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState<string | undefined>(
    problemData?.starterCode?.[selectedLanguage] || "",
  );

  const { streamClient, call, chatClient, channel, isInitializingCall } =
    useStreamClient({
      session,
      loadingSession: LoadingSession,
      isHost,
      isParticipant,
    });

  console.log(
    isInitializingCall,
    streamClient,
    call,
    chatClient,
    "streamclient details:",
  );

  console.log(problemData, "problemData");

  //redirect the "participant" when session ends
  useEffect(() => {
    if (!session || LoadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, LoadingSession, navigate]);

  //auto-join the session when user is not already a participant or not already a host.
  useEffect(() => {
    if (!session || !user || LoadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id as string, {
      onSuccess: refetch,
    });
  }, [session, user, LoadingSession, isHost, isParticipant]);

  //Update the code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    //Use problem specific starter code
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code ?? "");
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end the session? All participants will be notified.",
      )
    ) {
      //on ending session, host will be redirected to the dashboard page
      endSessionMutation.mutate(id || "", {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL - code editor and problem description */}

          <Panel defaultSize={40} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={40} minSize={20}>
                <div className="bg-base-200 overflow-y-auto h-full">
                  {/* Header section */}
                  <div className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1>{session?.problemTitle || "Loading.."}</h1>

                        {problemData?.category && (
                          <span className="text-base-content/60 mt-1">
                            {problemData.category}
                          </span>
                        )}

                        <p className="text-base-content/60 mt-1">
                          Host: {session?.host?.name || "Loading.."} .{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge ${getDifficultyBadgeClass(
                            session?.difficulty,
                          )}`}
                        >
                          {session?.difficulty}
                        </span>
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            className="btn btn-error btn-sm"
                            disabled={endSessionMutation.isPending}
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="size-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="size-4" />
                            )}
                            End Session
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Problem description */}
                    {problemData?.description && (
                      <>
                        <h1 className="text-lg font-semibold mb-4">
                          Problem Description
                        </h1>
                        <p className="whitespace-pre-wrap">
                          {problemData?.description.text}
                          {problemData.description.notes.map((note, index) => (
                            <span key={index}>
                              {"\n\n"}
                              {note}
                            </span>
                          ))}
                        </p>
                      </>
                    )}

                    {/* Examples section */}
                    {problemData?.examples &&
                      problemData.examples.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                          <h2 className="text-lg font-semibold mb-4">
                            Examples
                          </h2>
                          <div className="space-y-4">
                            {problemData?.examples?.map((example, idx) => (
                              <div key={idx}>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="badge badge-sm">
                                    {idx + 1}
                                  </span>
                                  <p className="font-semibold text-base-content">
                                    Example {idx + 1}
                                  </p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                                  <div className="flex gap-2">
                                    <span className="text-primary font-bold min-w-[70px]">
                                      Input:
                                    </span>
                                    <span>{example.input}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <span className="text-secondary font-bold min-w-[70px]">
                                      Output:
                                    </span>
                                    <span>{example.output}</span>
                                  </div>
                                  {example.explanation && (
                                    <div className="pt-2 border-t border-base-300 mt-2">
                                      <span className="text-base-content/60 font-sans text-xs">
                                        <span className="font-semibold">
                                          Explanation:
                                        </span>{" "}
                                        {example.explanation}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Constraints section */}
                    {problemData?.constraints &&
                      problemData.constraints.length > 0 && (
                        <div>
                          <h2 className="text-lg font-semibold mb-4">
                            Constraints
                          </h2>
                          <ul className="list-disc list-inside space-y-2">
                            {problemData.constraints.map((constraint, idx) => (
                              <li key={idx}>{constraint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize " />

              {/* CODE EDITOR PANEL */}

              <Panel defaultSize={40} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={60} minSize={30}>
                    <CodeEditor
                      selectedLanguage={selectedLanguage}
                      isRunning={isRunning}
                      code={code}
                      onCodeChange={setCode}
                      onLanguageChange={handleLanguageChange}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize " />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize " />

          {/* RIGHT PANEL - video calling and chat section */}
          <Panel defaultSize={60} minSize={30}>
            <div className="h-full bg-base-200 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <Loader2Icon className="size-6 animate-spin text-primary" />
                  <p className="text-lg">Connecting to video call..</p>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 roundeed-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="size-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection failed</h2>
                      <p className="text-base-content">
                        Unable to connect to video call
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default SessionPage;
