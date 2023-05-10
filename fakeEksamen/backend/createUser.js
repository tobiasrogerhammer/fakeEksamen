const router = require("express").Router();
const Username = require("./user");

router.post('/create', async (req, res) => {
    try {
        const newUsername = new Username({
            username: req.body.username,
            mailadress: req.body.mailadress,
            password: req.body.password,
        });
        const username = await newUsername.save();
        res.status(200).json(username);
    } catch (err) { res.status(500).json('feil1') }
})

router.post('/login', async (req, res) => {
    try {
        const username = await Username.findOne({ username: req.body.username });
        if (!username) {
            return res.status(404).json('User not found');
        }
        const isMatch = await bcrypt.compare(req.body.password, username.password);
        if (!isMatch) {
            return res.status(401).json('Invalid credentials');
        }
        res.status(200).json('Login successful');
    } catch (err) {
        console.log(err);
        res.status(500).json('internal server error');
    }
});

module.exports = router;