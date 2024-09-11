const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidate");
const User = require("../models/user");
const { jwtAuthMiddleware } = require("../jwt");
require("dotenv").config();

//==> Checking if the user is admin or not
const checkAdmin = async (userID) => {
  try {
    //==> Getting the user role
    const userRole = await User.findById(userID).select("role");
    //==> if role is not defind or not to be found
    if (!userRole) {
      console.log("User not found");
      return false;
    }
    //==> if we find admin
    if (userRole.role === "admin") {
      console.log("Admin");
      return true;
    } else {
      console.log("voter");
      return false;
    }
  } catch (error) {
    console.log("Error while checking admin status:", error);
  }
};

//==> Creating Candidates
//==> {http://localhost:5000/candidate} {✔}
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    //==> checking if the user is admin or not
    if (!(await checkAdmin(req.user.id))) {
      return res
        .status(403)
        .json({ message: "You are not authorized to create a candidate" });
    }
    //==> Taking data from the request body;
    const data = req.body;
    const savedUser = new Candidate(data);
    //==> Creating a new user one at a time;
    const response = await savedUser.save();
    //==> show the user details and Providing the token;
    res.status(201).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Issue in creating Candidate" });
  }
});

//==> Update Candidates
//==> {http://localhost:5000/candidate/:candidateId} {✔}
router.put("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  if (!(await checkAdmin(req.user.id))) {
    return res
      .status(403)
      .json({ message: "You are not authorized to create a candidate" });
  }
  const candidateId = req.params.candidateId;
  const updatedCandidate = req.body;
  try {
    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updatedCandidate,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).send({ msg: "Candidate not found" });
    }
    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in updating the Candidate" });
  }
});

//==> Delete Candidates
//==> {http://localhost:5000/candidate/:candidateId} {✔}
router.delete("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  if (!(await checkAdmin(req.user.id))) {
    return res
      .status(403)
      .json({ message: "You are not authorized to create a candidate" });
  }
  const candidateId = req.params.candidateId;
  //   console.log(`Value::: ${candidateId}`);
  try {
    const response = await Candidate.findByIdAndDelete(candidateId);
    if (!response) {
      return res.status(404).send({ msg: "Candidate not found" });
    }
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in Deleting the Candidate" });
  }
});

//==> Voting line
//==> {http://localhost:5000/vote/:candidateId} {✔}
router.post("/vote/:candidateId", jwtAuthMiddleware, async (req, res) => {
  const candidateId = req.params.candidateId;
  const userId = req.user.id;

  try {
    // Find the candidate and user
    const candidate = await Candidate.findOne({ _id: candidateId }); // Use correct _id field
    const user = await User.findById({ _id: userId });

    // Check if user is found
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Check if candidate is found
    if (!candidate) {
      return res.status(404).send({ msg: "Selected wrong candidate" });
    }

    // Prevent duplicate voting
    if (user.isVoted) {
      return res.status(403).send({ msg: "You have already voted" });
    }

    // Admin can't vote
    if (user.role === "admin") {
      return res.status(403).send({ msg: "Admins cannot vote" });
    }

    // Record the vote for the candidate
    candidate.votes.push({ user: userId });
    candidate.voteCount++;

    // Save the candidate's vote
    await candidate.save();

    // Mark the user as having voted
    user.isVoted = true;
    await user.save();

    res.status(200).send({ msg: "Vote cast successfully" });
  } catch (error) {
    console.error("Error during voting process: ", error);
    res
      .status(500)
      .send({ msg: "Error in voting process", error: error.message });
  }
});

//==> count the total vote
//==> {http://localhost:5000/vote/count} {✔}
router.get("/vote/count", async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });
    const voteRecords = candidate.map((data) => {
      return {
        party: data.party,
        voteCount: data.voteCount,
      };
    });
    return res.status(200).send(voteRecords);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error in get the Candidate vote" });
  }
});

module.exports = router;
