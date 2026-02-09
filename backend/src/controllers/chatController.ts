import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    //clerkId is used for stram token - it should match the id in stream dashboard.
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).send({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.image,
    });
  } catch (error) {
    console.error("Error in getStreamToken controller", error);
    res.status(500).json({ msg: "Internal Server error" });
  }
}
