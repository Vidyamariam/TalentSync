import { useState, useEffect } from "react";
import { type Channel, StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";
import type { Call, StreamVideoClient } from "@stream-io/video-react-sdk";

interface UseStreamClientProps {
  session: any;
  loadingSession: boolean;
  isHost: boolean;
  isParticipant: boolean;
}

function useStreamClient({
  session,
  loadingSession,
  isHost,
  isParticipant,
}: UseStreamClientProps) {
  const [streamClient, setStreamClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const [chatClient, setChatClient] = useState<StreamChat>();
  const [channel, setChannel] = useState<Channel>();
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  console.log(session, isHost, isParticipant, "session5465^^");

  useEffect(() => {
    let videoCall: Call;
    let chatClientInstance: StreamChat;

    const initCall = async () => {
      if (!session.callId) return;
      if (!isHost && !isParticipant) return;

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        console.log("try block of initCall function", token);

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token,
        );

        setStreamClient(client);
        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const chatApiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(chatApiKey);
        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token,
        );
        setChatClient(chatClientInstance);
        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId,
        );
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error init call", error);
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) initCall();

    //cleanup return methods - performance reasons
    return () => {
      //iife
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {}
      })();
    };
  }, [session, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
