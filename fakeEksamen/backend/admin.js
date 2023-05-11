const router = require("express").Router();
const Meeting = require("./meetingSchema");

router.post("/create", async (req, res) => {
  try {
    const newMeeting = new Meeting({
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      agenda: req.body.agenda,
      isCompleted: req.body.isCompleted,
    });
    const username = await newMeeting.save();
    res.status(200).json(username);
  } catch (err) {
    res.status(500).json("feil1");
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.status(200).json("Meeting deleted successfully");
  } catch (err) {
    res.status(500).json("feil5");
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
    console.log(meetings);
  } catch (err) {
    res.status(500).json("feil2");
  }
});

module.exports = router;
