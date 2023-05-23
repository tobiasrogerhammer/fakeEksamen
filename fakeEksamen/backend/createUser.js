const router = require("express").Router();
const Username = require("./user");
const bcrypt = require("bcryptjs");

router.post("/create", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUsername = new Username({
      username: req.body.username,
      mailadress: req.body.mailadress,
      password: hashedPassword,
    });
    const username = await newUsername.save();
    res.status(200).json(username);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await Username.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("User not found");
    }
    if (user.isAdmin) {
      return res
        .status(200)
        .json({ message: "Login successful", isAdmin: true });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json("Invalid credentials");
    }
    res.status(200).json({ message: "Login successful", isAdmin: false });
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.get("/huddly", async (req, res) => {
  try {
    const users = await Username.find({}, { username: 1, _id: 0 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/multiple", async (req, res) => {
  try {
    const users = req.body.users;
    const createdUsers = [];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const newUser = new Username({
        username: user.username,
        mailadress: user.mailadress,
        password: hashedPassword,
      });
      const createdUser = await newUser.save();
      createdUsers.push(createdUser);
    }

    res.status(200).json(createdUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
