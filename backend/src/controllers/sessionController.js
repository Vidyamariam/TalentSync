import { StreamClient } from "@stream-io/node-sdk";
import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";
import User from "../models/User.js";

export async function createSession(req, res) {
  try {
    const { problemTitle, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    if (!problemTitle || !difficulty) {
      console.error("problem and difficulty is required");
    }

    //generate a unique callId for session
    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
    console.log(callId, "callId");

    const session = await Session.create({
      problemTitle,
      difficulty,
      host: userId,
      callId,
    });

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: {
          problemTitle,
          difficulty,
          sessionId: session._id?.toString(),
        },
      },
    });

    const channel = await chatClient.channel("messaging", callId, {
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    return res.status(201).json({ session });
  } catch (error) {
    console.error("Error in creating session", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(201).json({ sessions });
  } catch (error) {
    console.error("Error in getActiveSessions controller", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;
    const sessions = Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(201).json({ sessions });
  } catch (error) {
    console.error("Error in getMyRecentSessions controller", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(401).send({ msg: "session not found" });

    res.status(201).json({ session });
  } catch (error) {
    console.error("Error in getSessionById controller", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    const session = await Session.findById(id);

    if (!session) return res.status(401).send({ msg: "session not found" });

    //check if session is already full - has a participant
    if (session.participant)
      return res.status(401).send({ msg: "session is full" });
    session.participant = userId;
    await session.save();

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).send({ session });
  } catch (error) {
    console.error("Error in joinSession controller", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id);
    if (!session) return res.status(401).send({ msg: "session not found" });
    if (session.host)
      return res.status(403).send({ msg: "Only the host can end the session" });
    if (session.status === "completed") {
      return res.status(400).send({ msg: "The session is already completed" });
    }
    session.status = "completed";
    await session.save();

    // delete stream video call
    const call = await streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = await chatClient.channel("messaging", session.callId);
    await channel.delete();

    res.status(200).send({ msg: "session ended successfully" });
  } catch (error) {
    console.error("Error in endSession controller", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}
